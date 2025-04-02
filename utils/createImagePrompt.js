// export default function createImagePrompt(options = {}) {
//   const {
//     scene = '',
//     detailed = true
//   } = options;
  
//    const basePrompt = `anime,  2D, flat, ghibli,  Art by  Ghibli Studio, the style of Studio Ghibli`;
  
//    const ghibliElements = detailed ? `
//    - Soft, pastel colors characteristic of Studio Ghibli films.
//    - Detailed backgrounds with lush vegetation and atmospheric lighting.
//    - Hand-drawn aesthetic with visible line work, resembling traditional cel animation.
//    - Emotional and expressive facial features, maintaining the exact expressions from the original photo.
//   ` : '';

//    const finalInstructions = `
//    The final image must be an exact recreation of the original photograph, but in the Studio Ghibli style.
//         Preserve the exact composition, poses, and expressions of all people and animals in the photo.
//         Do not alter or change any facial features, ethnic characteristics, or racial features.
//         This should look like a frame from a Ghibli film, not a photo with a filter.
//         Maintain the exact same positions of all objects and people as in the original photo.
//         The image should be a completely redrawn animation cel, suitable for display in the Ghibli Museum.
//   `;
 
//    const prompt = `
//     ${basePrompt}
//     ${ghibliElements}
//     ${finalInstructions}
//     ${scene ? `Scene: ${scene}` : ""}
//   `.trim();

//   console.log("Final prompt:", prompt);

//   return prompt;
// }

// export default function createImagePrompt(options = {}) {
//   const {
//     scene = '',
//     detailed = true
//   } = options;
  
//   // More family-friendly Ghibli style guidance
//   const basePrompt = `Create a wholesome Studio Ghibli style animation cel of the following family-friendly scene. 
// The image should be in the authentic style of Hayao Miyazaki and Studio Ghibli films like "Spirited Away", 
// "My Neighbor Totoro", and "Howl's Moving Castle".`;
  
//   const ghibliStyleElements = detailed ? `
//   An animated robot in the style of Japanese 2D animation, featuring soft pastel colours and a highly detailed environment. The robot has rounded, friendly shapes and smooth lines, seamlessly blending into a natural landscape. The background depicts a picturesque village or forest with warm sunlight, gentle shadows, and atmospheric perspective. Attention to detail: leaves swaying in the breeze, sunlit glows, the texture of wood and stone. The colours are rich yet soft, with a subtle watercolour effect. The composition feels natural, emphasising depth and the robot’s interaction with its surroundings.` : '';

//   // More appropriate preservation instructions
//   const preservationInstructions = `
// Important requirements:
// - Create a faithful artistic interpretation of the described scene
// - Maintain the general composition and arrangement
// - Keep the scene wholesome and family-friendly
// - Preserve the essence and mood of the original scene
// - The final image should look like an authentic frame from a Ghibli film`;

//   // Technical specifications
//   const technicalSpecs = `
// Technical details:
// - Use the classic 2D animation cel look characteristic of Ghibli
// - Apply clean outlines with the signature Ghibli line weight
// - Use soft color fills with subtle gradients where appropriate
// - Ensure the art style is consistent throughout the entire image`;
    
//   const prompt = `
// ${basePrompt}

// ${ghibliStyleElements}

// ${preservationInstructions}

// ${technicalSpecs}

// Scene description: ${scene}
// `.trim();

//   console.log("Final prompt:", prompt);
//   return prompt;
// }

export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    detailed = true
  } = options;
  
  const basePrompt = `Convert the provided photograph into an authentic frame in the style of 2D animation. 
The image must retain the exact composition, objects, people, animals, background, colours, and details as seen in the original photo.`;

  const ghibliStyleElements = detailed ? `
  Apply the following stylistic transformations:
  - Use soft pastel colours and smooth shading with subtle gradients.
  - Maintain a highly detailed environment with warm, natural lighting.
  - Ensure expressive linework with varying weights, characteristic of hand-drawn animation.
  - Preserve all objects, people, and animals exactly as they appear in the original image.
  - Keep textures rich and natural, similar to traditional cel animation techniques.` : '';

  const preservationInstructions = `
Important requirements:
- Do not alter the composition, poses, or positions of objects.
- Do not remove or add any elements that are not present in the original image.
- Maintain the essence and mood of the original photograph.
- The final image must look like an authentic frame from an animated film while remaining a direct translation of the provided photo.
- Do not alter or change any facial features, ethnic characteristics, or racial features.
- Ensure that all people, objects, and animals are positioned and posed exactly as they are in the original image, preserving angles, distances, and spatial relationships.
- The orientation of faces, gazes, and body movements must exactly match the original image, reflecting the precise posture and interaction of all subjects.
- Any small details, such as hand gestures, expressions, object placements, and textures, must be meticulously preserved.`;

  const technicalSpecs = `
Technical details:
- Use the classic 2D animation cel look.
- Apply hand-drawn style outlines with a signature natural flow.
- Soft, rich colour fills with watercolour-like gradients.
- The final image must be in high resolution, detailed, and visually faithful to the original.`;

  const prompt = `
${basePrompt}

${ghibliStyleElements}

${preservationInstructions}

${technicalSpecs}

Photo description: ${scene}
`.trim();

  console.log("Final prompt:", prompt);
  return prompt;
}
