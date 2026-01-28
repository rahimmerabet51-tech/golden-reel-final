// Simple script to add site1.mp4 to Featured Works
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbznrwkwxkwxfsdewtcv.supabase.co';
const supabaseKey = 'sb_publishable_ftdPKjJmwzUXLCuCwOYLSw_YgmYrbfw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addVideo() {
  try {
    console.log('Adding site1.mp4 to Featured Works...');
    
    const newWork = {
      title: "R motion - Cinematic Portfolio Showcase",
      url: "/site1.mp4",
      type: "video"
    };

    const { data, error } = await supabase
      .from('works')
      .insert([newWork])
      .select();

    if (error) {
      console.error('❌ Error:', error.message);
      console.log('Trying alternative approach...');
      
      // Try with service role key if available
      return;
    }

    console.log('✅ Success! Video added to Featured Works:');
    console.log('Title:', data[0].title);
    console.log('URL:', data[0].url);
    console.log('Type:', data[0].type);
    console.log('\n🎬 Visit: http://localhost:5173/featured-works to see your video!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addVideo();
