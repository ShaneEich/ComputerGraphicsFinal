#version 150

out vec4  fColor;
in vec3 fL;
in vec3 fE;
in vec3 fN;
in vec2 fTexCoord;

uniform vec4 LightAmbient, LightDiffuse, LightSpecular;
uniform vec4 MaterialAmbient, MaterialDiffuse, MaterialSpecular;
uniform float Shininess;

uniform sampler2D texture;
uniform sampler2D specularTexture;


vec3 computeDistanceTexture(vec2 tp)
{
	float gray =  1 - sqrt(pow(tp.x - 0.5, 2) + pow(tp.y - 0.5, 2));
	return vec3(gray, gray, gray);
}

vec3 computeCircleTexture(vec2 tp)
{
	if(sqrt(pow(tp.x - 0.5, 2) + pow(tp.y - 0.5, 2)) > 0.5)
	{
		return vec3(0, 0, 0);
	}
	else
	{
		return vec3(1, 1, 1);
	}
}

vec3 computeTexture(vec2 texturePosition)
{
	if(texturePosition.x > 0.5 && texturePosition.y > 0.5 || texturePosition.x < 0.5 && texturePosition.y < 0.5)
	{
		return vec3(0, 0, 0);
	}
	else
	{
		return vec3(1, 1, 1);
	}
}


void
main()
{
	vec3 L = normalize(fL);
    vec3 E = normalize(fE);
    vec3 N = normalize(fN);
    vec3 H = normalize( L + E );

    //vec4 ambient = MaterialAmbient * LightAmbient * texture2D(texture, fTexCoord);

    vec4 ambient = MaterialAmbient * LightAmbient * texture2D(texture, fTexCoord);

    float Kd = max( dot(L, N), 0.0);
    //vec4 diffuse = Kd * MaterialDiffuse * LightDiffuse * texture2D(specularTexture, fTexCoord);

    vec4 diffuse = Kd * MaterialDiffuse * LightDiffuse * texture2D(texture, fTexCoord);// * texture2D(specularTexture, fTexCoord);

    float Ks = pow( max(dot(N, H), 0.0), Shininess );

    vec4 specular = Ks * MaterialSpecular  * LightSpecular * texture2D(specularTexture, fTexCoord);

    if( dot(L, N) < 0.0)
    {
        specular = vec4(0.0, 0.0, 0.0, 1.0);
    }
    fColor = ambient + diffuse + specular;
    //fColor = fColor * vec4(computeDistanceTexture(fTexCoord), 1);
    //fColor = vec4(computeDistanceTexture(fTexCoord), 1);
    //fColor = vec4(fTexCoord, 1, 1);
    fColor.a = 1.0;
}
