export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    detailed = true
  } = options;
  
  const basePrompt = `Create a wholesome 3D computer-animated style that resembles modern animation from studios like Pixar or Illumination style animation cel of the following family-friendly scene. The image must retain the exact composition, objects, people, animals, background, colours, and details as seen in the DIRECT TRANSLATION of the submitted photo.`;

  const ghibliStyleElements = detailed ? `
  Apply the following stylistic transformations:
  - Stylized character design with exaggerated proportions  
- Detailed texturing on skin, hair, and clothing
- Dramatic lighting with warm tones and overhead pendant lights creating a cozy atmosphere
- Depth of field effects with the background slightly blurred
- Rich color palette with emphasis on warm browns, reds, and blues
- Clean, defined lines and smooth surfaces typical of 3D computer animation
  - Keep all objects, people and animals exactly as they were in the original image, be guided by the description you were given and don't add detail that isn't in the photo description.
  - Textures should be rich and natural, as in traditional cel animation techniques.` : '';

  const preservationInstructions = `
  - Do not change the composition, poses, or positions of objects.
  - Do not remove or add ANY elements that are not in the photo description.
  - Don't change the background, don't add interior elements you didn't get in the description. 
  - Keep the essence and mood of the original photo.
  - The final image should look like an authentic frame from an animated film, while remaining a DIRECT TRANSLATION of the submitted photo.
  - Do not alter or change facial features, ethnic or racial characteristics.
  - Make sure that all people, objects and animals are positioned and posed EXACTLY as in the original image, maintaining angles, distances and spatial relationships.
  - Orientation of faces, gazes, and body movements should match the original image EXACTLY, reflecting the EXACT pose and interaction of all subjects.
  - All fine details such as hand gestures, expressions, object placement and textures should be CAREFULLY PRESERVED.`;

//   const technicalSpecs = `
// Technical details:
// - Use EXCLUSIVELY 3D computer-animated style that resembles modern animation from studios like Pixar or Illumination cel look.
// - Characters should be emotionally expressive, with visible hand-drawn lines, as in traditional frame-by-frame animation. Keep the EXACT composition and poses as in the original photograph, but turn it into a frame from a Ghibli animated film suitable for display at the Ghibli Museum.
// - Apply hand-drawn style outlines with a signature natural flow.
// - Soft, rich colour fills with watercolour-like gradients.
// - The final image must be in high resolution, detailed, and visually faithful to the original.
// - CRITICAL: The result must be a single continuous image, not divided or split in any way. No side-by-side comparisons or black and white portions.`;

  const prompt = `
${basePrompt}
${preservationInstructions}
${ghibliStyleElements}


Photo description: ${scene}
`.trim();

  console.log("Final prompt:", prompt);
  return prompt;
}



// ${technicalSpecs}