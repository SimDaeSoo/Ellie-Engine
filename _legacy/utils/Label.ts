import * as PIXI from 'pixi.js';

function createLabel(text: string): {
  container: PIXI.Container;
  label: PIXI.Text;
} {
  const labelContainer = new PIXI.Container();
  const labelBackground = new PIXI.Graphics();
  const label = new PIXI.Text(text, {
    fontSize: 13,
    fill: 0xffffff,
  });

  label.x = 1;
  label.y = 1;

  labelBackground.beginFill(0x000000, 0.5);
  labelBackground.drawRect(0, 0, label.width + 2, label.height + 2);
  labelBackground.endFill();
  labelContainer.addChild(labelBackground);
  labelContainer.addChild(label);

  return {
    container: labelContainer,
    label,
  };
}

export { createLabel };
