import React, { useState, useEffect } from 'react';

const ImageRotator = () => {
  const [prefix, setPrefix] = useState(0);
  const [suffix, setSuffix] = useState(9);
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const maxPrefix = 4;
  const maxSuffix = 17;
  const sensitivityX = 5; // Sensibilidade para movimento horizontal
  const sensitivityY = 10; // Sensibilidade para movimento vertical

  useEffect(() => {
    const url = `https://stermax.com.br/images_idealine/labelle-rosa-vr/${prefix}_${suffix}.webp`;
    setImageUrl(url);
  }, [prefix, suffix]);

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const { clientX, clientY } = getTouchPosition(event);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      const { clientX, clientY } = getTouchPosition(event);
      const diffX = clientX - startX;
      const diffY = clientY - startY;

      // Movimento horizontal (rotação)
      if (Math.abs(diffX) > sensitivityX) {
        if (diffX >= 0) {
          handlePrev();
        } else {
          handleNext();
        }
        setStartX(clientX);
      }

      // Movimento vertical (visualização superior/inferior)
      if (Math.abs(diffY) > sensitivityY) {
        if (diffY >= 0) {
          handleUp();
        } else {
          handleDown();
        }
        setStartY(clientY);
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleNext = () => {
    setSuffix((prevSuffix) => (prevSuffix + 1) % (maxSuffix + 1));
  };

  const handlePrev = () => {
    setSuffix((prevSuffix) => (prevSuffix === 0 ? maxSuffix : prevSuffix - 1));
  };

  const handleUp = () => {
    setPrefix((prevPrefix) => (prevPrefix === maxPrefix ? maxPrefix : prevPrefix + 1));
  };

  const handleDown = () => {
    setPrefix((prevPrefix) => (prevPrefix === 0 ? 0 : prevPrefix - 1));
  };

  const getTouchPosition = (
    event: React.MouseEvent | React.TouchEvent
  ): { clientX: number; clientY: number } => {
    if ('touches' in event) {
      const touch = event.touches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
    return { clientX: event.clientX, clientY: event.clientY };
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt={`Image ${prefix}_${suffix}`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        draggable="false"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
    </div>
  );
};

export default ImageRotator;
