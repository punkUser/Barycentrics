#version 450

#include "Common.glsl"

layout (location = 0) in vec2 v_tex0;
layout (location = 2) in vec3 v_viewVector;

layout (location = 0) out vec4 fragColor0;

void main()
{
	uint index0 = g_indices[gl_PrimitiveID*3];
	uint index1 = g_indices[gl_PrimitiveID*3+1];
	uint index2 = g_indices[gl_PrimitiveID*3+2];

	Vertex vertex0 = getVertex(index0);
	Vertex vertex1 = getVertex(index1);
	Vertex vertex2 = getVertex(index2);

	vec3 barycentrics = intersectRayTri(g_cameraPos.xyz,
		normalize(v_viewVector),
		(vec4(vertex0.position, 1) * g_matWorld).xyz,
		(vec4(vertex1.position, 1) * g_matWorld).xyz,
		(vec4(vertex2.position, 1) * g_matWorld).xyz);

	fragColor0.rgb = barycentrics;
	fragColor0.a = 1.0;
}