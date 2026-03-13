import React, { useState, useEffect } from 'react';

const ImageRotator = () => {
  const [prefix, setPrefix] = useState(0);
  const [suffix, setSuffix] = useState(9);
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const maxPrefix = 4;
  const maxSuffix = 17;
  const sensitivityX = 5;
  const sensitivityY = 10;

  useEffect(() => {
    const url = `https://stermax.com.br/images_idealine/labelle-vr-black/${prefix}_${suffix}.webp`;
    setImageUrl(url);
  }, [prefix, suffix]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

      if (Math.abs(diffX) > sensitivityX) {
        if (diffX >= 0) {
          handlePrev();
        } else {
          handleNext();
        }
        setStartX(clientX);
      }

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
    <div
      style={{
        padding: isMobile ? '24px 0' : '0',
      }}
    >
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
        draggable={false}
        style={{
          width: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'grab',
          margin: isMobile ? '0' : '24px',
          boxShadow: 'white 1px 1px 74px',
          borderRadius: '25px',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};

export default ImageRotator;
