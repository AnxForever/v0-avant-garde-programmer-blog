/**
 * Verification script for blog-data.ts
 * Tests that all cached functions work correctly
 */

import { getCachedPosts, getCachedPost, getCachedPostSlugs, extractDescription } from '../lib/blog-data'

console.log('🔍 Verifying blog-data.ts implementation...\n')

// Test 1: getCachedPosts()
console.log('Test 1: getCachedPosts()')
const allPosts = getCachedPosts()
console.log(`✅ Retrieved ${allPosts.length} posts`)
console.log(`   First post: "${allPosts[0].title}"\n`)

// Test 2: getCachedPost()
console.log('Test 2: getCachedPost()')
const testSlug = 'vibe-coding-philosophy'
const post = getCachedPost(testSlug)
if (post) {
  console.log(`✅ Found post with slug "${testSlug}"`)
  console.log(`   Title: "${post.title}"`)
  console.log(`   Category: "${post.category}"\n`)
} else {
  console.log(`❌ Post with slug "${testSlug}" not found\n`)
}

// Test 3: getCachedPost() with non-existent slug
console.log('Test 3: getCachedPost() with non-existent slug')
const nonExistentPost = getCachedPost('non-existent-slug')
if (nonExistentPost === undefined) {
  console.log(`✅ Correctly returns undefined for non-existent slug\n`)
} else {
  console.log(`❌ Should return undefined for non-existent slug\n`)
}

// Test 4: getCachedPostSlugs()
console.log('Test 4: getCachedPostSlugs()')
const slugs = getCachedPostSlugs()
console.log(`✅ Retrieved ${slugs.length} slugs`)
console.log(`   First 3 slugs: ${slugs.slice(0, 3).join(', ')}\n`)

// Test 5: extractDescription()
console.log('Test 5: extractDescription()')
const testContent = '# Heading\n\nThis is a **test** content with `code` and [links](url).'
const description = extractDescription(testContent, 30)
console.log(`✅ Extracted description: "${description}"`)
console.log(`   Length: ${description.length} characters\n`)

// Test 6: extractDescription() with long content
console.log('Test 6: extractDescription() with long content')
const longContent = 'A'.repeat(200)
const truncatedDesc = extractDescription(longContent, 50)
if (truncatedDesc.endsWith('...') && truncatedDesc.length === 53) {
  console.log(`✅ Correctly truncates long content with ellipsis`)
  console.log(`   Length: ${truncatedDesc.length} characters (50 + "...")\n`)
} else {
  console.log(`❌ Truncation not working correctly\n`)
}

// Test 7: Verify Post interface compatibility
console.log('Test 7: Verify Post interface compatibility')
const samplePost = allPosts[0]
const requiredFields = ['id', 'title', 'category', 'date', 'slug', 'content']
const hasAllFields = requiredFields.every(field => field in samplePost)
if (hasAllFields) {
  console.log(`✅ All required fields present in Post interface\n`)
} else {
  console.log(`❌ Missing required fields in Post interface\n`)
}

// Test 8: Check for graduation posts
console.log('Test 8: Check for graduation posts')
const graduationPosts = allPosts.filter(p => p.isGraduation)
console.log(`✅ Found ${graduationPosts.length} graduation posts`)
if (graduationPosts.length > 0) {
  console.log(`   Example: "${graduationPosts[0].title}"\n`)
}

console.log('✨ All verification tests completed!')
