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

export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    detailed = true
  } = options;
  
  // More family-friendly Ghibli style guidance
  const basePrompt = `Create a wholesome Studio Ghibli style animation cel of the following family-friendly scene. 
The image should be in the authentic style of Hayao Miyazaki and Studio Ghibli films like "Spirited Away", 
"My Neighbor Totoro", and "Howl's Moving Castle".`;
  
  const ghibliStyleElements = detailed ? `
Style specifications:
- Soft watercolor-like backgrounds with gentle diffused lighting
- Classic Ghibli color palette with soft pastel blues, greens, and warm earth tones
- Hand-painted look with delicate brushstrokes and clean line work
- Warm and nostalgic atmosphere typical in Ghibli films
- Clean, minimalist animation style with expressive faces
- Gentle shadows and highlights in the Ghibli technique
- Nature elements drawn with Ghibli's signature attention to detail` : '';

  // More appropriate preservation instructions
  const preservationInstructions = `
Important requirements:
- Create a faithful artistic interpretation of the described scene
- Maintain the general composition and arrangement
- Keep the scene wholesome and family-friendly
- Preserve the essence and mood of the original scene
- The final image should look like an authentic frame from a Ghibli film`;

  // Technical specifications
  const technicalSpecs = `
Technical details:
- Use the classic 2D animation cel look characteristic of Ghibli
- Apply clean outlines with the signature Ghibli line weight
- Use soft color fills with subtle gradients where appropriate
- Ensure the art style is consistent throughout the entire image`;
    
  const prompt = `
${basePrompt}

${ghibliStyleElements}

${preservationInstructions}

${technicalSpecs}

Scene description: ${scene}
`.trim();

  console.log("Final prompt:", prompt);
  return prompt;
}