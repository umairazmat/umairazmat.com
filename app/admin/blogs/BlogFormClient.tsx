'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, X, Loader2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  featured: z.boolean().default(false),
  category_id: z.string().optional(),
  cover_image: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type BlogFormData = z.infer<typeof blogSchema>

interface BlogFormClientProps {
  blogId?: string
}

export default function BlogFormClient({ blogId: propBlogId }: BlogFormClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createBrowserSupabaseClient()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [tags, setTags] = useState<{ id: string; name: string; slug: string }[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTagName, setNewTagName] = useState('')
  const isEdit = pathname?.includes('/edit') || !!propBlogId
  // Get blog ID from props or URL: /admin/blogs/[id]/edit
  const blogId = propBlogId || (isEdit ? pathname?.split('/').slice(-2, -1)[0] : null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      featured: false,
    },
  })

  const watchedTitle = watch('title')

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !isEdit) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setValue('slug', slug)
    }
  }, [watchedTitle, setValue, isEdit])

  useEffect(() => {
    loadCategories()
    loadTags()
    if (isEdit && blogId) {
      loadBlog()
    }
  }, [isEdit, blogId])

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')

      if (error) {
        console.error('Error loading categories:', error)
      } else {
        setCategories(data || [])
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('id, name, slug')
        .order('name')

      if (error) {
        console.error('Error loading tags:', error)
      } else {
        setTags(data || [])
      }
    } catch (error) {
      console.error('Error loading tags:', error)
    }
  }

  const handleAddTag = async () => {
    if (!newTagName.trim()) return

    try {
      const slug = newTagName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const { data, error } = await supabase
        .from('tags')
        .insert([{ name: newTagName.trim(), slug }])
        .select()
        .single()

      if (error) {
        if (error.code === '23505') {
          // Tag already exists, find it
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id, name, slug')
            .eq('slug', slug)
            .single()
          
          if (existingTag) {
            setTags([...tags, existingTag])
            setSelectedTags([...selectedTags, existingTag.id])
            setNewTagName('')
            toast.success('Tag added')
          }
        } else {
          toast.error('Failed to create tag')
          console.error(error)
        }
      } else {
        setTags([...tags, data])
        setSelectedTags([...selectedTags, data.id])
        setNewTagName('')
        toast.success('Tag created and added')
      }
    } catch (error) {
      toast.error('Error creating tag')
      console.error(error)
    }
  }

  const loadBlog = async () => {
    if (!blogId) {
      console.error('No blog ID found for editing')
      toast.error('No blog ID provided')
      return
    }

    try {
      setIsLoadingData(true)
      console.log('Loading blog with ID:', blogId)
      
      // First check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Not authenticated:', authError)
        toast.error('Please log in to edit blogs')
        router.push('/admin/login')
        return
      }
      
      console.log('User authenticated:', user.email)
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single()

      if (error) {
        console.error('Error loading blog:', error)
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        })
        
        // Provide specific error message
        let errorMsg = 'Failed to load blog'
        if (error.code === 'PGRST116') {
          errorMsg = 'Blog not found. It may have been deleted.'
        } else if (error.message?.includes('permission denied') || error.message?.includes('row-level security')) {
          errorMsg = 'Permission denied. Please check RLS policies allow admin to read blogs.'
        } else {
          errorMsg = `Failed to load blog: ${error.message || error.code || 'Unknown error'}`
        }
        
        toast.error(errorMsg)
        
        // Don't redirect immediately, let user see the error
        setTimeout(() => {
          router.push('/admin/blogs')
        }, 3000)
        return
      }

      if (!data) {
        console.error('Blog not found - data is null')
        toast.error('Blog not found')
        setTimeout(() => {
          router.push('/admin/blogs')
        }, 2000)
        return
      }

      console.log('Blog loaded successfully:', {
        id: data.id,
        title: data.title,
        slug: data.slug,
      })
      
      // Set form values
      setValue('title', data.title)
      setValue('slug', data.slug)
      setValue('excerpt', data.excerpt || '')
      setValue('content', data.content || '')
      setValue('featured', data.featured || false)
      setValue('category_id', data.category_id || '')
      setValue('cover_image', data.cover_image || '')
      
      // Load existing tags for this blog
      const { data: blogTags, error: tagsError } = await supabase
        .from('blog_tags')
        .select('tag_id')
        .eq('blog_id', data.id)
      
      if (tagsError) {
        console.error('Error loading tags:', tagsError)
        // Don't fail the whole load if tags fail
      } else if (blogTags) {
        console.log('Blog tags loaded:', blogTags.length, 'tags')
        setSelectedTags(blogTags.map(bt => bt.tag_id))
      } else {
        setSelectedTags([])
      }
      
      toast.success('Blog loaded successfully')
    } catch (error: any) {
      console.error('Exception loading blog:', error)
      toast.error(`Error loading blog: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsLoadingData(false)
    }
  }

  const onSubmit = async (data: BlogFormData) => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Not authenticated')
        router.push('/admin/login')
        return
      }

      const blogData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featured: data.featured,
        category_id: data.category_id || null,
        cover_image: data.cover_image || null,
        author_id: user.id,
        updated_at: new Date().toISOString(),
      }

      if (isEdit && blogId) {
        // Update blog
        const { data: updatedBlog, error: updateError } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', blogId)
          .select()
          .single()

        if (updateError) {
          toast.error('Failed to update blog')
          console.error(updateError)
        } else {
          // Update tags
          if (updatedBlog) {
            // Delete existing tags
            await supabase
              .from('blog_tags')
              .delete()
              .eq('blog_id', updatedBlog.id)

            // Insert new tags
            if (selectedTags.length > 0) {
              const tagInserts = selectedTags.map(tagId => ({
                blog_id: updatedBlog.id,
                tag_id: tagId,
              }))
              await supabase.from('blog_tags').insert(tagInserts)
            }
          }
          toast.success('Blog updated successfully')
          router.push('/admin/blogs')
        }
      } else {
        // Create new blog
        const { data: newBlog, error: insertError } = await supabase
          .from('blogs')
          .insert([blogData])
          .select()
          .single()

        if (insertError) {
          toast.error('Failed to create blog')
          console.error(insertError)
        } else {
          // Insert tags
          if (newBlog && selectedTags.length > 0) {
            const tagInserts = selectedTags.map(tagId => ({
              blog_id: newBlog.id,
              tag_id: tagId,
            }))
            await supabase.from('blog_tags').insert(tagInserts)
          }
          toast.success('Blog created successfully')
          router.push('/admin/blogs')
        }
      }
    } catch (error) {
      toast.error('Error saving blog')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug *
            </label>
            <input
              {...register('slug')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (MDX) *
            </label>
            <textarea
              {...register('content')}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono text-sm dark:bg-gray-700 dark:text-white"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              {...register('category_id')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">No Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              {...register('cover_image')}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              {/* Existing Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.id])
                        } else {
                          setSelectedTags(selectedTags.filter(id => id !== tag.id))
                        }
                      }}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                  </label>
                ))}
              </div>

              {/* Add New Tag */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Create new tag..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Tag
                </button>
              </div>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              {...register('featured')}
              type="checkbox"
              id="featured"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Featured Post
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEdit ? 'Update' : 'Create'} Blog
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
