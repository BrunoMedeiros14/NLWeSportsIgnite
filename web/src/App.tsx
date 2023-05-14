import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { Root } from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER}/games`).then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-16'>
      <img src={logoImg} alt='_blank' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-clip-text text-transparent bg-nlwDuo'>duo</span>{' '}
        está {import.meta.env.VITE_SOME_KEY} aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Root>
    </div>
  )
}

export default App
