import { baseApi } from "@/lib/redux/apiSlice";
import { VideoFormValues } from "@/lib/schemas/videoSchema";

export const videoEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateVideo: builder.mutation<
      { success: boolean; data: { videoUrl: string } },
      VideoFormValues
    >({
      query: (data) => ({
        url: "/video/generate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const { useGenerateVideoMutation } = videoEndpoints;
