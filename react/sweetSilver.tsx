import React, { useMemo, useRef, useState } from 'react'

const BASE_URL =
  'https://stermax.com.br/images_idealine/vr-sweet-silver'

const MAX_SUFFIX = 18
const HORIZONTAL_STEP = 18
const VERTICAL_STEP = 42

// Ordem visual real da navegação vertical:
// topo -> reta -> baixo
const VERTICAL_ORDER = [4, 3, 2, 1, 0, 5, 6, 7, 8]

const ImageRotator: React.FC = () => {
  const [verticalIndex, setVerticalIndex] = useState(4) // começa no prefix 0
  const [suffix, setSuffix] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const accXRef = useRef(0)
  const accYRef = useRef(0)

  const prefix = VERTICAL_ORDER[verticalIndex]

  const imageUrl = useMemo(() => {
    return `${BASE_URL}/${prefix}_${suffix}.webp`
  }, [prefix, suffix])

  const getPointerPosition = (
    event: React.MouseEvent | React.TouchEvent
  ): { clientX: number; clientY: number } => {
    if ('touches' in event) {
      const touch = event.touches[0]
      return { clientX: touch.clientX, clientY: touch.clientY }
    }

    return { clientX: event.clientX, clientY: event.clientY }
  }

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = getPointerPosition(event)

    setIsDragging(true)
    startXRef.current = clientX
    startYRef.current = clientY
    accXRef.current = 0
    accYRef.current = 0
  }

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const { clientX, clientY } = getPointerPosition(event)

    const deltaX = clientX - startXRef.current
    const deltaY = clientY - startYRef.current

    startXRef.current = clientX
    startYRef.current = clientY

    accXRef.current += deltaX
    accYRef.current += deltaY

    while (Math.abs(accXRef.current) >= HORIZONTAL_STEP) {
      if (accXRef.current > 0) {
        setSuffix(prev => (prev === 0 ? MAX_SUFFIX : prev - 1))
        accXRef.current -= HORIZONTAL_STEP
      } else {
        setSuffix(prev => (prev + 1) % (MAX_SUFFIX + 1))
        accXRef.current += HORIZONTAL_STEP
      }
    }

    while (Math.abs(accYRef.current) >= VERTICAL_STEP) {
      if (accYRef.current > 0) {
        // arrastou para baixo
        setVerticalIndex(prev =>
          Math.min(prev + 1, VERTICAL_ORDER.length - 1)
        )
        accYRef.current -= VERTICAL_STEP
      } else {
        // arrastou para cima
        setVerticalIndex(prev => Math.max(prev - 1, 0))
        accYRef.current += VERTICAL_STEP
      }
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    accXRef.current = 0
    accYRef.current = 0
  }

  return (
    <div
      style={{
        width: '100%',
        userSelect: 'none',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img
        src={imageUrl}
        alt={`Imagem 360 ${prefix}_${suffix}`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        draggable={false}
        style={{
          width: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'grab',
          margin: '24px',
          boxShadow: 'white 1px 1px 74px',
          borderRadius: '25px',
          backgroundColor: "white"
        }}
      />
    </div>
  )
}

export default ImageRotator
