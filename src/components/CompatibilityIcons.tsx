import Image from "next/image"

interface IIcons {
  iconsImg: string
  alt: string
}

const CompatibilityIcons = () => {
  const iconData: IIcons[] = [
    {
      iconsImg: "/icons/ai.png",
      alt: "Adobe Illustrator",
    },
    {
      iconsImg: "/icons/ai.png",
      alt: "Adobe Express",
    },
    {
      iconsImg: "/icons/ai.png",
      alt: "Sketch",
    },
    {
      iconsImg: "/icons/ai.png",
      alt: "SVG",
    },
    {
      iconsImg: "/icons/ai.png",
      alt: "Figma",
    },
  ]

  return (
    <div className="flex gap-4">
      {iconData.map((icon, index) => (
        <Icons key={index} iconsImg={icon.iconsImg} alt={icon.alt} />
      ))}
    </div>
  )
}

const Icons = ({ iconsImg, alt }: IIcons) => {
  return (
    <div className="bg-background p-3 rounded-2xl">
      <Image src={iconsImg} alt={alt} width={30} height={30} />
    </div>
  )
}

export default CompatibilityIcons
