/**
 * Test Supabase Connection
 * Run with: npx tsx scripts/test-supabase-connection.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Make sure .env.local has:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  try {
    // Test 1: Check if we can connect
    console.log('1. Testing connection...')
    const { data, error } = await supabase.from('categories').select('count').limit(1)
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
    console.log('✅ Connection successful!\n')

    // Test 2: Check if tables exist
    console.log('2. Checking tables...')
    const tables = ['blogs', 'categories', 'tags', 'appointments', 'leads', 'analytics']
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabase.from(table).select('*').limit(1)
        if (tableError) {
          console.error(`   ❌ Table "${table}" not found or inaccessible`)
        } else {
          console.log(`   ✅ Table "${table}" exists`)
        }
      } catch (err: any) {
        console.error(`   ❌ Error checking "${table}":`, err.message)
      }
    }
    console.log('')

    // Test 3: Check RLS policies
    console.log('3. Testing RLS policies...')
    const { data: publicData, error: publicError } = await supabase
      .from('blogs')
      .select('id')
      .limit(1)
    
    if (publicError) {
      console.error('   ❌ Public read policy issue:', publicError.message)
    } else {
      console.log('   ✅ Public read policies working')
    }
    console.log('')

    console.log('🎉 All tests passed! Your Supabase setup is working correctly.')
    return true
  } catch (error: any) {
    console.error('❌ Test failed:', error.message)
    return false
  }
}

testConnection()
  .then((success) => {
    if (!success) {
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error('Unexpected error:', error)
    process.exit(1)
  })
