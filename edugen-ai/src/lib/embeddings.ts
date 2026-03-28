import { pipeline, env } from '@xenova/transformers'

env.allowLocalModels = false

let embedder: any = null

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    if (!embedder) {
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    }

    const result = await embedder(text, {
      pooling: 'mean',
      normalize: true,
    })

    return Array.from(result.data)
  } catch (error) {
    console.error('Embedding error:', error)
    throw error
  }
}

export async function getMultipleEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = []
  
  for (const text of texts) {
    const embedding = await getEmbeddings(text)
    embeddings.push(embedding)
  }
  
  return embeddings
}
