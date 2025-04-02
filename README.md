# AI Image Enhancer

A web application that uses AI to enhance and upscale your images. Upload any image and get a higher quality version processed through advanced AI algorithms.

## Features

- **Image Upload**: Drag and drop or click to upload images
- **AI Enhancement**: Automatically enhances image quality
- **Side-by-Side Comparison**: View original and enhanced images simultaneously
- **Download Results**: Save enhanced images with one click
- **Responsive Design**: Works on both desktop and mobile devices

## Technologies Used

- **Frontend**:
  - React (TypeScript)
  - Tailwind CSS
  - Axios for API calls
- **Backend API**:
  - PicWish Image Enhancement API

## Usage

1. Open the application in your browser
2. Click or drag and drop an image to upload
3. Wait while the AI processes your image (typically takes 10-20 seconds)
4. View the enhanced result side-by-side with the original
5. Click "Download Enhanced Image" to save your improved image

## API Documentation

This application uses the [PicWish Image Enhancement API](https://techhk.aoscdn.com/):

````markdown
# 🚀 Image Enhancement API Service

This module handles all communication with the PicWish Image Enhancement API, providing a clean interface for uploading and enhancing images.

## 🔄 Workflow

1. **Upload Image** → Get Task ID
2. **Poll Status** with Task ID → Get Enhanced Image
3. **Return** Enhanced Image URL

## 📦 API Methods

### `enhancedImageAPI(file: File)`

Main function that orchestrates the enhancement process:

```typescript
const enhancedData = await enhancedImageAPI(imageFile);
// Returns: { state: number, image?: string }
```
````

## 🔧 Internal Methods

### `uploadImage(file)`

- Creates FormData with image
- POSTs to `/api/tasks/visual/scale`
- Returns `task_id`

### `PollForEnhancedImage(taskId)`

- Polls API every 2 seconds (max 10 retries)
- Checks processing state (4 = in progress)
- Returns when enhancement completes

### `fetchEnhancedImage(task_id)`

- GETs enhancement status from API
- Returns current state and image URL

## ⚙️ Configuration

```typescript
const api = axios.create({
  baseURL: "https://techhk.aoscdn.com/",
  headers: {
    "X-API-KEY": "your_api_key_here",
  },
});
```

## 🛠 Error Handling

- Throws errors for:
  - Failed uploads (no task ID)
  - Processing timeouts (10 retries)
  - Failed status checks

## 📊 Response Structure

```typescript
interface EnhancedImageData {
  state: number; // 4 = processing
  image?: string; // Enhanced image URL
}
```

## 💡 Usage Example

```typescript
try {
  const result = await enhancedImageAPI(imageFile);
  if (result.image) {
    // Display enhanced image
  }
} catch (error) {
  console.error("Enhancement failed:", error.message);
}
```

> **Note:** Requires `VITE_API_KEY` in environment variables

```

```

## Project Structure

```
/src
├── /api
│   └── enhancedImageApi.ts    # API service functions
├── /components
│   ├── Footer.tsx             # App footer
│   ├── Home.tsx               # Home page component
│   ├── ImagePreview.tsx       # Comparison view component
│   ├── ImageUpload.tsx        # File upload component
│   └── Loading.tsx            # Loading spinner
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

```

```
