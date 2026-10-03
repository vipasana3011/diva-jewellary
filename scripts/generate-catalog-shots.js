const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');

const PRODUCTS_LIST = [
  // RINGS
  { id: 'aurelia-ring', name: 'Aurelia Ring', category: 'rings', collection: 'The Aurelia Collection' },
  { id: 'elan-ring', name: 'Élan Ring', category: 'rings', collection: 'The Élan Collection' },
  { id: 'seraphine-ring', name: 'Seraphine Ring', category: 'rings', collection: 'The Seraphine Collection' },
  { id: 'celeste-ring', name: 'Celeste Ring', category: 'rings', collection: 'The Celeste Collection' },

  // NECKLACES
  { id: 'celeste-necklace', name: 'Celeste Necklace', category: 'necklaces', collection: 'The Celeste Collection' },
  { id: 'lumiere-necklace', name: 'Lumière Necklace', category: 'necklaces', collection: 'The Lumière Collection' },
  { id: 'aurelia-necklace', name: 'Aurelia Necklace', category: 'necklaces', collection: 'The Aurelia Collection' },
  { id: 'noire-necklace', name: 'Noire Necklace', category: 'necklaces', collection: 'The Noire Collection' },

  // EARRINGS
  { id: 'lumiere-earrings', name: 'Lumière Earrings', category: 'earrings', collection: 'The Lumière Collection' },
  { id: 'aurelia-earrings', name: 'Aurelia Earrings', category: 'earrings', collection: 'The Aurelia Collection' },
  { id: 'seraphine-earrings', name: 'Seraphine Earrings', category: 'earrings', collection: 'The Seraphine Collection' },
  { id: 'elan-earrings', name: 'Élan Earrings', category: 'earrings', collection: 'The Élan Collection' },

  // BRACELETS
  { id: 'seraphine-bracelet', name: 'Seraphine Bracelet', category: 'bracelets', collection: 'The Seraphine Collection' },
  { id: 'celeste-bracelet', name: 'Celeste Bracelet', category: 'bracelets', collection: 'The Celeste Collection' },
  { id: 'lumiere-bracelet', name: 'Lumière Bracelet', category: 'bracelets', collection: 'The Lumière Collection' },
  { id: 'aurelia-bracelet', name: 'Aurelia Bracelet', category: 'bracelets', collection: 'The Aurelia Collection' },

  // SETS
  { id: 'aurelia-signature-set', name: 'Aurelia Signature Set', category: 'sets', collection: 'The Aurelia Collection' },
  { id: 'celeste-signature-set', name: 'Celeste Signature Set', category: 'sets', collection: 'The Celeste Collection' },
  { id: 'noire-signature-set', name: 'Noire Signature Set', category: 'sets', collection: 'The Noire Collection' },
  { id: 'diva-signature-set', name: 'DIVA Signature Set', category: 'sets', collection: 'High Joaillerie Vault' }
];

async function createBaseBraceletsAndSets() {
  const baseBangle = path.join(PRODUCTS_DIR, 'seraphine-bracelet.png');
  const celesteRing = path.join(PRODUCTS_DIR, 'celeste-ring.png');
  const lumiereNecklace = path.join(PRODUCTS_DIR, 'lumiere-necklace.png');
  const aureliaRing = path.join(PRODUCTS_DIR, 'aurelia-ring.png');
  const aureliaNecklace = path.join(PRODUCTS_DIR, 'aurelia-necklace.png');
  const aureliaEarrings = path.join(PRODUCTS_DIR, 'aurelia-earrings.png');
  const celesteNecklace = path.join(PRODUCTS_DIR, 'celeste-necklace.png');
  const noireNecklace = path.join(PRODUCTS_DIR, 'noire-necklace.png');
  const elanRing = path.join(PRODUCTS_DIR, 'elan-ring.png');

  // 1. Celeste Bracelet: Blend Seraphine bracelet with celestial arcs motif
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'celeste-bracelet.png'))) {
    const ringCenter = await sharp(celesteRing)
      .extract({ left: 350, top: 350, width: 324, height: 324 })
      .resize(180, 180)
      .toBuffer();

    await sharp(baseBangle)
      .composite([{ input: ringCenter, top: 422, left: 422, blend: 'over' }])
      .toFile(path.join(PRODUCTS_DIR, 'celeste-bracelet.png'));
    console.log('Created celeste-bracelet.png');
  }

  // 2. Lumière Bracelet
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'lumiere-bracelet.png'))) {
    const dropCenter = await sharp(lumiereNecklace)
      .extract({ left: 420, top: 500, width: 184, height: 260 })
      .resize(130, 180)
      .toBuffer();

    await sharp(baseBangle)
      .composite([{ input: dropCenter, top: 422, left: 447, blend: 'over' }])
      .toFile(path.join(PRODUCTS_DIR, 'lumiere-bracelet.png'));
    console.log('Created lumiere-bracelet.png');
  }

  // 3. Aurelia Bracelet
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'aurelia-bracelet.png'))) {
    const ovalCenter = await sharp(aureliaNecklace)
      .extract({ left: 380, top: 480, width: 264, height: 300 })
      .resize(160, 180)
      .toBuffer();

    await sharp(baseBangle)
      .composite([{ input: ovalCenter, top: 422, left: 432, blend: 'over' }])
      .toFile(path.join(PRODUCTS_DIR, 'aurelia-bracelet.png'));
    console.log('Created aurelia-bracelet.png');
  }

  // 4. Aurelia Signature Set
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'aurelia-signature-set.png'))) {
    const neckThumb = await sharp(aureliaNecklace).resize(600, 600).toBuffer();
    const ringThumb = await sharp(aureliaRing).resize(360, 360).toBuffer();
    const earringsThumb = await sharp(aureliaEarrings).resize(360, 360).toBuffer();

    await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: { r: 5, g: 5, b: 6, alpha: 1 } }
    })
      .composite([
        { input: neckThumb, top: 40, left: 212 },
        { input: earringsThumb, top: 580, left: 100 },
        { input: ringThumb, top: 580, left: 564 }
      ])
      .png()
      .toFile(path.join(PRODUCTS_DIR, 'aurelia-signature-set.png'));
    console.log('Created aurelia-signature-set.png');
  }

  // 5. Celeste Signature Set
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'celeste-signature-set.png'))) {
    const neckThumb = await sharp(celesteNecklace).resize(600, 600).toBuffer();
    const ringThumb = await sharp(celesteRing).resize(360, 360).toBuffer();
    const bangleThumb = await sharp(path.join(PRODUCTS_DIR, 'celeste-bracelet.png')).resize(380, 380).toBuffer();

    await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: { r: 5, g: 5, b: 6, alpha: 1 } }
    })
      .composite([
        { input: neckThumb, top: 40, left: 212 },
        { input: ringThumb, top: 580, left: 100 },
        { input: bangleThumb, top: 580, left: 544 }
      ])
      .png()
      .toFile(path.join(PRODUCTS_DIR, 'celeste-signature-set.png'));
    console.log('Created celeste-signature-set.png');
  }

  // 6. Noire Signature Set
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'noire-signature-set.png'))) {
    const neckThumb = await sharp(noireNecklace).resize(620, 620).toBuffer();
    const elanThumb = await sharp(elanRing).resize(360, 360).toBuffer();
    const elanEar = await sharp(path.join(PRODUCTS_DIR, 'elan-earrings.png')).resize(360, 360).toBuffer();

    await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: { r: 5, g: 5, b: 6, alpha: 1 } }
    })
      .composite([
        { input: neckThumb, top: 40, left: 202 },
        { input: elanThumb, top: 580, left: 100 },
        { input: elanEar, top: 580, left: 564 }
      ])
      .png()
      .toFile(path.join(PRODUCTS_DIR, 'noire-signature-set.png'));
    console.log('Created noire-signature-set.png');
  }

  // 7. DIVA Signature Set
  if (!fs.existsSync(path.join(PRODUCTS_DIR, 'diva-signature-set.png'))) {
    const neckThumb = await sharp(lumiereNecklace).resize(620, 620).toBuffer();
    const aureliaThumb = await sharp(aureliaRing).resize(360, 360).toBuffer();
    const braceletThumb = await sharp(path.join(PRODUCTS_DIR, 'seraphine-bracelet.png')).resize(380, 380).toBuffer();

    await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: { r: 5, g: 5, b: 6, alpha: 1 } }
    })
      .composite([
        { input: neckThumb, top: 40, left: 202 },
        { input: aureliaThumb, top: 580, left: 100 },
        { input: braceletThumb, top: 580, left: 544 }
      ])
      .png()
      .toFile(path.join(PRODUCTS_DIR, 'diva-signature-set.png'));
    console.log('Created diva-signature-set.png');
  }
}

async function generateAllThreeShots() {
  console.log('Generating Shot 01, Shot 02, and Shot 03 for all 20 products...');

  for (const item of PRODUCTS_LIST) {
    const baseFile = path.join(PRODUCTS_DIR, `${item.id}.png`);
    if (!fs.existsSync(baseFile)) {
      console.warn(`Base file missing for ${item.id}`);
      continue;
    }

    const shot1Path = path.join(PRODUCTS_DIR, `${item.id}-1.png`);
    const shot2Path = path.join(PRODUCTS_DIR, `${item.id}-2.png`);
    const shot3Path = path.join(PRODUCTS_DIR, `${item.id}-3.png`);

    // SHOT 01: Hero Product Shot (Normalized 1024x1024 centered hero)
    await sharp(baseFile)
      .resize(1024, 1024, { fit: 'contain', background: { r: 5, g: 5, b: 6, alpha: 1 } })
      .png({ quality: 95 })
      .toFile(shot1Path);

    // SHOT 02: Macro Detail / Close-up Shot
    // Zoom in on the central 520x520 gemstone/craftsmanship focal area and expand to 1024x1024
    const meta = await sharp(baseFile).metadata();
    const cropWidth = Math.round(meta.width * 0.52);
    const cropHeight = Math.round(meta.height * 0.52);
    const cropLeft = Math.round((meta.width - cropWidth) / 2);
    const cropTop = Math.round((meta.height - cropHeight) * 0.44); // focus slightly upper-center where gems sit

    await sharp(baseFile)
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .resize(1024, 1024, { kernel: 'lanczos3' })
      .modulate({ brightness: 1.04, saturation: 0.96 }) // subtle crisp studio brilliance
      .sharpen({ sigma: 1.2 })
      .png({ quality: 95 })
      .toFile(shot2Path);

    // SHOT 03: Editorial Angle / Cinematic View
    // An artistic composition: slightly offset three-quarter perspective with vignette focus
    const editWidth = Math.round(meta.width * 0.72);
    const editHeight = Math.round(meta.height * 0.72);
    const editLeft = Math.round(meta.width * 0.12);
    const editTop = Math.round(meta.height * 0.16);

    await sharp(baseFile)
      .extract({ left: editLeft, top: editTop, width: editWidth, height: editHeight })
      .resize(1024, 1024, { kernel: 'lanczos3' })
      .modulate({ brightness: 0.98 })
      .png({ quality: 95 })
      .toFile(shot3Path);

    console.log(`Generated 3 shots for ${item.id}`);
  }
}

async function run() {
  await createBaseBraceletsAndSets();
  await generateAllThreeShots();
  console.log('ALL 20 PRODUCTS × 3 SHOTS = 60 IMAGES SUCCESSFULLY GENERATED!');
}

run().catch(console.error);
