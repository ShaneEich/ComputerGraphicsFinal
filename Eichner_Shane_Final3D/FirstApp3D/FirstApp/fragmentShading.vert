#version 150

in vec4 vPosition;
in vec3 vNormal;
in vec2 vTexCoord;
out vec3 fL;
out vec3 fE;
out vec3 fN;
out vec2 fTexCoord;

uniform mat4 ModelView;
uniform mat4 Projection;

uniform vec4 LightPosition;


void
main()
{

	vec3 pos = (ModelView * vPosition).xyz;

	fL = normalize(LightPosition.xyz - pos);
	fE = normalize( -pos );
	fN = normalize( ModelView * vec4(vNormal, 0.0)).xyz;

	fTexCoord = vTexCoord;

    gl_Position = Projection * ModelView * vPosition;
}
