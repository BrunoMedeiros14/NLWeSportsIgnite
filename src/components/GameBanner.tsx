interface GameBannerProps {
    bannerUrl: string,
    title: string,
    adsCount: number,
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={props.bannerUrl} alt="_blank" />
            <div key={props.title} className="w-full pt-16 pb-4 px-4 bg-nlwBoxGradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">
                    {props.title}
                </strong>
                <span className="text-zinc-300 text-sm block">{props.adsCount} anúncios(s)</span>
            </div>
        </a>
    )
}