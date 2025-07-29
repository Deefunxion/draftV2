document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scribble-canvas');
    if (!canvas) return;

    // Initialize Paper.js on the canvas
    paper.setup(canvas);

    let path = null;

    // Toggle pointer-events during drawing
    canvas.addEventListener('mousedown', () => {
        canvas.style.pointerEvents = 'auto';
    });

    canvas.addEventListener('mouseup', () => {
        canvas.style.pointerEvents = 'none';
    });

    const tool = new paper.Tool();

    // Begin a new path on mouse down
    tool.onMouseDown = (event) => {
        path = new paper.Path({
            strokeColor: 'black',
            strokeWidth: 2
        });
        path.add(event.point);
    };

    // Add points as the mouse drags
    tool.onMouseDrag = (event) => {
        if (path) {
            path.add(event.point);
        }
    };

    // Finalize the path on mouse up
    tool.onMouseUp = () => {
        if (path) {
            path.simplify();
            path = null;
        }
    };
});
