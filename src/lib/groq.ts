export const GROQ_API_URL = 'https://api.groq.com/openai/v1'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function fetchWithRetry(url: string, options: RequestInit, attempt: number = 1): Promise<Response> {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const errorText = await response.text()
    
    if ((errorText.includes('ConnectTimeoutError') || errorText.includes('rate_limit_exceeded')) && attempt < 2) {
      await new Promise(resolve => setTimeout(resolve, 3000))
      return fetchWithRetry(url, options, attempt + 1)
    }
    
    if (attempt >= 2) {
      throw new Error('rate_limit_exceeded')
    }
    
    throw new Error(`Groq API error: ${errorText}`)
  }
  
  return response
}

export async function chatCompletion(
  messages: ChatMessage[],
  model: string = 'llama-3.1-8b-instant'
): Promise<string> {
  try {
    const response = await fetchWithRetry(`${GROQ_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  } catch (error: any) {
    if (error.message === 'rate_limit_exceeded' || error.message?.includes('ConnectTimeoutError')) {
      return "I am having trouble connecting right now. Please try again in a moment."
    }
    return "I am having trouble connecting right now. Please try again in a moment."
  }
}
