export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    style = 'ghibli',
    mood = 'cheerful',
    detailed = true
  } = options;
  
  const styleBase = {
    pixar: "Pixar 3D animation",
    disney: "Disney 3D animation",
    dreamworks: "DreamWorks 3D animation",
    illumination: "Illumination 3D animation",
    ghibli: "Studio Ghibli 2D anime"
  };

  const styleInstructions = {
    pixar: `
      - Use Pixar's signature 3D style with detailed texturing
      - Create expressive characters with exaggerated features
      - Apply cinematic lighting with strong contrasts
      - Use rich, slightly saturated color palette
      - Add subtle details and textures to surfaces
    `,
    disney: `
      - Use Disney's smooth 3D animation style
      - Draw characters with big expressive eyes and animated facial features
      - Apply magical, fantasy-like lighting effects
      - Use vibrant, storybook color palette
      - Make characters appear slightly more youthful
      - Reference the style of "Frozen", "Moana", or "Tangled"
    `,
    dreamworks: `
      - Apply DreamWorks' bold character design approach
      - Use dramatic lighting and dynamic poses
      - Create expressive facial features with exaggerated emotions
      - Use rich, contrasting colors with dramatic shadows
      - Reference films like "How to Train Your Dragon" or "Shrek"
    `,
    illumination: `
      - Use Illumination's smooth textures and simplified forms
      - Create characters with exaggerated expressions and rounded shapes
      - Apply bright, vibrant colors with high saturation
      - Add smooth, minimal shadows and high-contrast lighting
      - Reference the style of "Despicable Me" or "The Secret Life of Pets"
    `,
    ghibli: `
      - Draw with signature large Ghibli eyes and simplified noses
      - Make characters appear more youthful and innocent
      - Apply soft, hand-drawn linework with visible brushstrokes
      - Use watercolor-style backgrounds with soft depth
      - Apply pastel and earth tone palette of Miyazaki films
      - Capture the magical, childlike wonder of Ghibli
      - The image should look like a still from an anime film
    `
  };
  
  const baseStyle = styleBase[style.toLowerCase()] || style;
  const styleGuide = styleInstructions[style.toLowerCase()] || '';
  
  let prompt = `Transform this scene into authentic ${baseStyle} with ${mood} mood.`;
  
  if (detailed) {
    prompt += `\nSTYLE INSTRUCTIONS:\n${styleGuide}\nMAINTAIN: Preserve all people, expressions, and key elements from the scene.`;
  }
  
  prompt += `\n\nSCENE: ${scene}`;
  
  return prompt.trim();
}