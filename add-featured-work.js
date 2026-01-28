import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pbznrwkwxkwxfsdewtcv.supabase.co';
const supabaseKey = 'sb_publishable_ftdPKjJmwzUXLCuCwOYLSw_YgmYrbfw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addFeaturedWork() {
  try {
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
      console.error('Error adding work:', error);
      return;
    }

    console.log('✅ Featured work added successfully:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

addFeaturedWork();
