import axios, { AxiosResponse } from "axios";

// API response structure types
interface UploadImageResponse {
  status: number;
  message: string;
  data: {
    task_id: string;
  };
}

interface EnhancedImageData {
  state: number; // Processing state (4 = processing, others may indicate completion)
  image?: string; // URL of the enhanced image when ready
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://techhk.aoscdn.com/",
});

/**
 * Main function to enhance an image through the API
 * Handles upload, polling, and returns enhanced image data
 * @param file - Image file to enhance
 * @returns Enhanced image data or undefined if failed
 */
export const enhancedImageAPI = async (file: File) => {
  try {
    // Step 1: Upload image and get task ID
    const taskId = await uploadImage(file);
    console.log("Upload successful. Task ID:", taskId);

    // Step 2: Poll for enhanced image result
    const enhancedImageData = await PollForEnhancedImage(taskId);
    console.log("Enhancement complete:", enhancedImageData);

    return enhancedImageData;
  } catch (error) {
    console.error(
      "Enhancement failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
};

/**
 * 1.Uploads image file to the enhancement service
 * @param file - Image file to upload
 * @returns Task ID for tracking processing status
 */
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data }: AxiosResponse<UploadImageResponse> = await api.post(
    "/api/tasks/visual/scale",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": import.meta.env.VITE_API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Image upload failed - no task ID received");
  }
  return data.data.task_id;
};

/**
 * 2. Polls the API for enhanced image result
 * @param taskId - Tracking ID from upload step
 * @param retries - Current retry count (default 0)
 * @returns Enhanced image data when processing completes
 */
const PollForEnhancedImage = async (
  taskId: string,
  retries = 0
): Promise<EnhancedImageData> => {
  const result = await fetchEnhancedImage(taskId);

  // when State 4 means "still processing then fetch api call again and again"
  if (result.state === 4) {
    console.log(`Processing... attempt ${retries + 1}/10`);

    if (retries >= 10) {
      throw new Error("Processing timeout - maximum retries reached");
    }

    // Wait 2 seconds before next poll
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return PollForEnhancedImage(taskId, retries + 1);
  }
  console.log("Enhanced Image URL:", result);
  return result;
};

/**
 * 3.Fetches current enhancement status from API
 * @param task_id - Tracking ID from upload step
 * @returns Current processing state and image data if available
 */
const fetchEnhancedImage = async (task_id: string) => {
  const { data } = await api.get(`/api/tasks/visual/scale/${task_id}`, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    },
  });

  if (!data?.data) {
    throw new Error("Failed to fetch enhancement status");
  }

  return data.data;
};
