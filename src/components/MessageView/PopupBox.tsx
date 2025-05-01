import React from 'react';

interface PopupBoxProps {
  box: { id: number; top: number; left: number; closed: boolean };
  theme: any; // Define a proper type for theme
  onClose: (id: number) => void;
  onMouseDown: (e: React.MouseEvent | React.TouchEvent, box: any) => void;
}

const PopupBox: React.FC<PopupBoxProps> = ({ box, theme, onClose, onMouseDown }) => {
  if (box.closed) return null;

  return (
    <div
    key={box.id}
    className={`absolute rounded-lg shadow-xl p-4 w-64 ${theme.backgroundColor} ${theme.borderColor} border-2 cursor-grab`}
    style={{
        top: `${box.top}%`,
        left: `${box.left}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
    }}
    onMouseDown={(e) => onMouseDown(e, box)}
    onTouchStart={(e) => onMouseDown(e, box)}
    >
    <div className="flex justify-between items-center mb-2">
        <h3 className={`text-sm font-semibold ${theme.textColor}`}>Advertisement</h3>
        <button
        onClick={() => onClose(box.id)}
        className={`${theme.textColor} hover:opacity-80 focus:outline-none`}
        >
        ✕
        </button>
    </div>
    <div className={`p-2 rounded ${theme.backgroundColor === 'bg-black' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5173894246439198"
        data-ad-slot="1432184900"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ></ins>
        <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
    </div>
  );
};

export default PopupBox;
