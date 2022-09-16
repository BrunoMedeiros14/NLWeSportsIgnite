import { MagnifyingGlassPlus } from "phosphor-react";
import { Trigger } from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return (
        <div className="pt-1 bg-nlwDuo self-stretch mt-8 rounded-lg overflow-hidden">
            <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className="block text-2xl text-white font-black">
                        Não encontrou seu duo?
                    </strong>
                    <span className="text-zinc-400 block">
                        Publique um anúncio para encontrar novos players!
                    </span>
                </div>
                <Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Trigger>
            </div>
        </div>
    )
}