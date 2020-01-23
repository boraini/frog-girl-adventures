in layout(location = 0) vec3 position;
in layout(location = 2) vec2 inTexCoords;
out vec2 outTexCoords;

void main()
{
  gl_Position = vec4(position, 1.0f);
  outTexCoords = inTexCoords;
}
