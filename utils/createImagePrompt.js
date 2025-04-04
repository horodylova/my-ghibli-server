export default function createImagePrompt(options = {}) {
  const {
    scene = '',   
    style = 'ghibli',
    mood = 'cheerful',
    detailed = true
  } = options;
  
  const styleDetails = {
    pixar: "Pixar-style 3D animation with detailed texturing, expressive characters, and cinematic lighting",
    disney: "Disney-style 3D animation with fluid movement, bright colors, and expressive characters",
    dreamworks: "DreamWorks-style 3D animation with bold character design, dramatic lighting, and cinematic composition",
    illumination: "Illumination-style 3D animation with smooth textures, simplified forms, and vibrant colors",
    ghibli: "Studio Ghibli-style animation with hand-drawn qualities, watercolor backgrounds, and natural movements"
  };
  
  const styleDescription = styleDetails[style.toLowerCase()] || style;
  
  const basePrompt = `You are an animation artist. Create a portrait of the photo whose description you received in ${styleDescription}:`;
  
  const styleElements = detailed ? `
    Apply these artistic elements:
    - Render characters and objects in authentic ${style} animation style
    - Apply ${mood} lighting and characteristic ${style} texturing
    - Use a color palette typical of ${style} animation
  ` : '';

  const preservationInstructions = `
    Important:
    - Maintain all people, objects and their positions from the description
    - Preserve facial expressions, ethnicities, and key details
    - Keep the composition and setting as described
  `;
  
  const technicalSpecs = `
    Technical requirements:
    - Create a high-quality single frame that looks like ${style} animation
    - The image should appear as if taken from a ${style} animated production
  `;
  
  const prompt = `
${basePrompt}

${styleElements}

${preservationInstructions}

${technicalSpecs}

SCENE DESCRIPTION (already analyzed): ${scene}
`.trim();
  
  console.log("Final prompt:", prompt);
  return prompt;
}