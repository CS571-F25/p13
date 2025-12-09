import React from 'react'
import Sortable from 'react-sortablejs'
import './Board.css'

// react-sortablejs exports a named ReactSortable export in some builds; prefer that, then .default, then the import itself
const SortableComponent = (Sortable && (Sortable.ReactSortable || Sortable.ReactSortable)) || (Sortable && Sortable.default) || Sortable

function SortableItem({ id, img }) {
  return (
    <div className="masonry-item" data-id={id}>
      <img loading="lazy" src={img.url} alt={img.alt || 'Inspiration'} draggable="false" />
    </div>
  )
}

export default function ImageGrid({ images, setImages, loading, boardRef, emptyMessage }) {
  const isEmpty = !images || images.length === 0

  return (
    <>
      <div className="board-shell">
        <div className="masonry-board" ref={boardRef}>
          {isEmpty ? (
            <div className="empty-state">
              {emptyMessage}
            </div>
          ) : (
            <SortableComponent
              list={images}
              setList={(next) => setImages(next)}
              options={{ animation: 150, handle: '.masonry-item', dataIdAttr: 'data-id' }}
              tag="div"
              className="masonry-sortable"
            >
              {images.map((img) => (
                <SortableItem key={img.id} id={img.id} img={img} />
              ))}
            </SortableComponent>
          )}
        </div>
      </div>
      {loading && (
        <div className="mt-3 text-muted d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden />
          <span>이미지를 불러오는 중...</span>
        </div>
      )}
    </>
  )
}
