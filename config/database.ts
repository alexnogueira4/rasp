import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient<any>(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '', {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})


// Channel name can be any string.
// Create channels with the same name for both the broadcasting and receiving clients.
const channel = supabase.channel('room1')

channel.subscribe((status) => {
  if (status === 'SUBSCRIBED') {
    // now you can start broadcasting cursor positions
    setInterval(() => {
      channel.send({
        type: 'broadcast',
        event: 'cursor-pos',
        payload: { x: Math.random(), y: Math.random() },
      })
      console.log(status)
    }, 100)
  }
})

export default {}