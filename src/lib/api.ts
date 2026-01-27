import { supabase, Work } from './supabase'

export async function uploadFile(file: File, bucket: string = 'portfolio-media') {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return {
    path: data.path,
    publicUrl,
    fileName
  }
}

export async function saveWorkMetadata(work: Omit<Work, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('works')
    .insert([work])
    .select()

  if (error) {
    throw new Error(`Failed to save work: ${error.message}`)
  }

  return data[0]
}

export async function fetchWorks() {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch works: ${error.message}`)
  }

  return data
}

export async function deleteWork(id: string) {
  // First get the work to find the file path
  const { data: work, error: fetchError } = await supabase
    .from('works')
    .select('file_url')
    .eq('id', id)
    .single()

  if (fetchError) {
    throw new Error(`Failed to fetch work: ${fetchError.message}`)
  }

  // Delete from storage
  if (work.file_url) {
    const fileName = work.file_url.split('/').pop()
    if (fileName) {
      await supabase.storage
        .from('portfolio-media')
        .remove([fileName])
    }
  }

  // Delete from database
  const { error } = await supabase
    .from('works')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete work: ${error.message}`)
  }

  return true
}
