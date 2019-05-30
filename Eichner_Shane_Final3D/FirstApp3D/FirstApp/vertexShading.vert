#version 150

in vec4 vPosition;
in vec3 vNormal;
in vec3 vColor;
out vec4 Color;
uniform mat4 ModelView;
uniform mat4 Projection;

uniform vec4 LightAmbient, LightDiffuse, LightSpecular;
uniform vec4 LightPosition;
uniform vec4 MaterialAmbient, MaterialDiffuse, MaterialSpecular;
uniform float Shininess;


void
main()
{

	vec3 pos = (ModelView * vPosition).xyz;

	vec3 L = normalize(LightPosition.xyz - pos);
	vec3 E = normalize( -pos );
	vec3 H = normalize( L + E );

	vec3 N = normalize( ModelView * vec4(vNormal, 0.0)).xyz;

	vec4 ambient = MaterialAmbient * LightAmbient;
	float Kd = max( dot(L, N), 0.0);
	vec4 diffuse = Kd * MaterialDiffuse * LightDiffuse;
	float Ks = pow( max(dot(N, H), 0.0), Shininess );
	vec4 specular = Ks * MaterialSpecular * LightSpecular;
	if( dot(L, N) < 0.0)
	{
		specular = vec4(0.0, 0.0, 0.0, 1.0);
	}
    gl_Position = Projection * ModelView * vPosition;
	Color = ambient + diffuse + specular;
	Color.a = 1.0;
}
