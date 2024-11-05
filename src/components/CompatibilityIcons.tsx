import React, { useState } from "react"
import Image from "next/image"

interface IIcons {
  iconsImg: string
  alt: string
  value: string
  onChange: (value: string) => void
  isSelected: boolean
}

const CompatibilityIcons = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const iconData = [
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

  const handleIconClick = (alt: string) => {
    setSelectedIcon(alt)
    onChange(alt)
  }

  return (
    <div className="flex gap-4">
      {iconData.map((icon, index) => (
        <Icons
          value={value}
          onChange={handleIconClick}
          key={index}
          iconsImg={icon.iconsImg}
          alt={icon.alt}
          isSelected={selectedIcon === icon.alt}
        />
      ))}
    </div>
  )
}

const Icons = ({ iconsImg, alt, value, onChange, isSelected }: IIcons) => {
  return (
    <div
      onClick={() => onChange(alt)}
      className={`bg-background p-1 md:p-3 rounded-2xl ${
        isSelected ? "bg-blue-400" : ""
      }`}
    >
      <Image src={iconsImg} alt={alt} width={30} height={30} />
    </div>
  )
}

export default CompatibilityIcons
