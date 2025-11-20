import React from 'react'
import Sortable from 'react-sortablejs'
import './Board.css'

// react-sortablejs exports a named ReactSortable export in some builds; prefer that, then .default, then the import itself
const SortableComponent = (Sortable && (Sortable.ReactSortable || Sortable.ReactSortable)) || (Sortable && Sortable.default) || Sortable

function SortableItem({ id, img }) {
  return (
    <div className="masonry-item" data-id={id}>
      <img loading="lazy" src={img.url} alt={img.alt} />
    </div>
  )
}

export default function ImageGrid({ images, setImages, loading, boardRef }) {
  return (
    <>
      <div ref={boardRef} className="masonry-board">
        <SortableComponent
          list={images}
          setList={(next) => setImages(next)}
          options={{ animation: 150, handle: '.masonry-item', dataIdAttr: 'data-id' }}
          onChange={(order) => {
            const next = order.map(id => images.find(it => String(it.id) === String(id))).filter(Boolean)
            setImages(next)
          }}
        >
          {images.map((img) => (
            <SortableItem key={img.id} id={img.id} img={img} />
          ))}
        </SortableComponent>
      </div>
      {loading && <div className="mt-3">Loading images...</div>}
    </>
  )
}
