'use client';
import { useState } from 'react';

interface Props {
  photos: string[];
  vehicleName: string;
}

export default function VehicleGallery({ photos, vehicleName }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const displayPhotos = photos.length > 0 ? photos : ['/placeholder-car.svg'];

  function prev() { setActiveIdx(i => (i - 1 + displayPhotos.length) % displayPhotos.length); }
  function next() { setActiveIdx(i => (i + 1) % displayPhotos.length); }

  return (
    <div className="gallery">
      {/* Main image */}
      <div className="gallery-main">
        <img
          src={displayPhotos[activeIdx]}
          alt={`${vehicleName} — photo ${activeIdx + 1}`}
          className="gallery-main-img"
        />
        {displayPhotos.length > 1 && (
          <>
            <button className="gallery-arrow gallery-prev" onClick={prev} aria-label="Photo précédente">‹</button>
            <button className="gallery-arrow gallery-next" onClick={next} aria-label="Photo suivante">›</button>
            <div className="gallery-counter">{activeIdx + 1} / {displayPhotos.length}</div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayPhotos.length > 1 && (
        <div className="gallery-thumbs">
          {displayPhotos.map((src, i) => (
            <button
              key={i}
              className={`gallery-thumb${i === activeIdx ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={src} alt={`Miniature ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
