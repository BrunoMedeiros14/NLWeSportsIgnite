import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } from '@radix-ui/react-dialog'
import { GameController } from "phosphor-react";
import { Input } from "./Form/Input";

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="__blank" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-clip-text text-transparent bg-nlwDuo">duo</span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
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
        <Portal>
          <Overlay className="bg-black/60 inset-0 fixed" />
          <Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Title className="text-4xl font-black">Publique um anúncio</Title>
            <form className="mt-8 flex flex-col gap-4" >
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" placeholder='Selecione o game que deseja jogar' />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input placeholder='Como te chamam dentro do game?' id="name" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying" >Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord" >Qual seu Discord?</label>
                  <Input id='discord' type="text" placeholder='usuario#0000' />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Domingo'>D</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Segunda'>S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Terça'>T</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Quarta'>Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Quinta'>Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Sexta'>S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title='Sábado'>S</button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="hourStart">Qual horário do dia??</label>
                  <div className="grid grid-cols-2 gap-1">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Costumo me conectar no chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Close className="bg-zinc-500 px-5 h-12 rounded-md font semibold hover:bg-zinc-600">Cancelar</Close>
                <button type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font semibold flex items-center gap-3 hover:bg-violet-600">
                  <GameController className="w-6 h-6" />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Content>
        </Portal>
      </Root>



    </div>
  );
}

export default App;
