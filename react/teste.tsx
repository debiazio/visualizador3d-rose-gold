import React, { useState, useEffect } from 'react';

const ImageRotator = () => {
  const [prefix, setPrefix] = useState(0);
  const [suffix, setSuffix] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const maxPrefix = 4;
  const maxSuffix = 17;
  const sensitivityX = 5; // Sensibilidade para movimento horizontal
  const sensitivityY = 10; // Sensibilidade para movimento vertical

  useEffect(() => {
    const url = `https://stermax.com.br/images_idealine/labelleRoseGold/${prefix}_${suffix}.webp`;
    setImageUrl(url);
  }, [prefix, suffix]);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (isDragging) {
      const diffX = event.clientX - startX;
      const diffY = event.clientY - startY;

      // Movimento horizontal (rotação)
      if (Math.abs(diffX) > sensitivityX) {
        if (diffX >= 0) {
          handleNext();
        } else {
          handlePrev();
        }
        setStartX(event.clientX);
      }

      // Movimento vertical (visualização superior/inferior)
      if (Math.abs(diffY) > sensitivityY) {
        if (diffY >= 0) {
          handleDown();
        } else {
          handleUp();
        }
        setStartY(event.clientY);
      }
    }
  };

  const handleMouseUp = () => {
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

  return (
    <div>
      <img
        src={imageUrl}
        alt={`Image ${prefix}_${suffix}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        draggable="false"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
    </div>
  );
};

export default ImageRotator;

