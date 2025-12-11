import Sortable from 'react-sortablejs'
import './Board.css'
import { AiOutlineCheck } from "react-icons/ai";

// react-sortablejs exports a named ReactSortable export in some builds;
// prefer that, then .default, then the import itself
const SortableComponent =
  (Sortable && (Sortable.ReactSortable || Sortable.ReactSortable)) ||
  (Sortable && Sortable.default) ||
  Sortable

function SortableItem({ id, img, isSelected, onSelect }) {
  // return (
  //   <div className="masonry-item" data-id={id}>
  //     <img
  //       loading="lazy"
  //       src={img.url}
  //       alt={img.alt || 'Inspiration'}
  //       draggable="false"
  //     />
  //   </div>
  // )
  return (
    <div
      className="masonry-item"
      data-id={id}
      onClick={() => onSelect(id)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <img
        loading="lazy"
        src={img.url}
        alt={img.alt}
        draggable="false"
        style={{ display: "block", width: "100%" }}
      />
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(74, 74, 74, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#fff",
          }}
        >
          <AiOutlineCheck size={48} color="#fff" />
        </div>
      )}
    </div>
  )
}

export default function ImageGrid({
  images,
  setImages,
  selectedImages,
  setSelectedImages,
  loading,
  boardRef,
  emptyMessage,
}) {
  const isEmpty = !images || images.length === 0

  const toggleSelect = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="board-shell">
        <div className="masonry-board" ref={boardRef}>
          {isEmpty ? (
            <div className="empty-state">{emptyMessage}</div>
          ) : (
            <SortableComponent
              list={images}
              setList={(next) => setImages(next)}
              options={{
                animation: 150,
                handle: '.masonry-item',
                dataIdAttr: 'data-id',
              }}
              tag="div"
              className="masonry-sortable"
            >
              {images.map((img) => (
                <SortableItem 
                key={img.id} 
                id={img.id} 
                img={img} 
                isSelected={selectedImages.includes(img.id)}
                onSelect={toggleSelect}/>
              ))}
            </SortableComponent>
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-3 text-muted d-flex align-items-center gap-2">
          <div
            className="spinner-border spinner-border-sm text-secondary"
            role="status"
            aria-hidden
          />
          <span aria-live="polite">Loading images...</span>
        </div>
      )}
    </>
  )
}

