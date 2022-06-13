import { useState } from "react";
import { addRecoilAK47X, addRecoilAK47Y } from "./AK47Pattern";
import "./App.css";

let canShoot = false;
let recoilY = 0;
let recoilX = 0;
let mouseX = 0;
let mouseY = 0;
let bullets = 30;
let recoilBullet = 0;

let rof = 100;

function App() {
  const [items, setItems] = useState([]);

  const onMouseDownHandler = (event) => {
    //setItems([...items, { top: event.clientY, left: event.clientX }]);
    canShoot = true;
    let x = mouseX;
    let y = mouseY;
    setTimeout(() => shoot(y, x), rof);
  };

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    charStr === "R" && clearItems();
  };
  const shoot = (y, x) => {
    if (bullets < 1) {
      canShoot = false;
      return;
    }
    if (canShoot) {
      setItems((prevState) => {
        return [...prevState, { top: y + recoilY, left: x + recoilX }];
      });
      bullets--;
      recoilBullet++;
      recoilY = addRecoilAK47Y(recoilY, recoilBullet);
      recoilX = addRecoilAK47X(recoilX, recoilBullet);
      x = mouseX;
      y = mouseY;
      setTimeout(() => shoot(y, x), rof);
    }
  };
  const onMouseMoveHandler = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };
  const onMouseUpHandler = (event) => {
    canShoot = false;
    recoilY = 0;
    recoilX = 0;
    recoilBullet = 0;
  };
  const clearItems = () => {
    setItems([]);
    canShoot = false;
    recoilY = 0;
    recoilX = 0;
    bullets = 30;
    recoilBullet = 0;
  };

  return (
    <div className="App">
      <div
        onMouseMove={onMouseMoveHandler}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        className="main-div"
      >
        {items.map((element) => {
          return (
            <div
              style={{
                position: "fixed",
                top: element.top,
                left: element.left,
                width: "10px",
                height: "10px",
                background: "red",
                borderRadius: "10px",
              }}
            ></div>
          );
        })}
      </div>
      <button onClick={clearItems}>Reload</button>
    </div>
  );
}
export default App;
