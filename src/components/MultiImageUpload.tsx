import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploadProps {
  onImagesChanged: (images: string[]) => void;
  currentImages: string[];
  maxImages?: number;
}

export const MultiImageUpload = ({ 
  onImagesChanged, 
  currentImages = [], 
  maxImages = 6 
}: MultiImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Debug logging
  console.log('MultiImageUpload props:', { currentImages, maxImages });

  const handleFileUpload = async (files: FileList) => {
    console.log('handleFileUpload called with files:', files);
    
    if (currentImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images. You currently have ${currentImages.length} images.`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const newImageUrls: string[] = [];
      const totalFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Must be less than 5MB.`);
          continue;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image. Please select JPG, PNG, or WebP files.`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        console.log('Uploading file:', { fileName, filePath, fileSize: file.size });

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Upload error for', file.name, ':', error);
          alert(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        console.log('File uploaded successfully:', publicUrl);
        newImageUrls.push(publicUrl);
        setUploadProgress(((i + 1) / totalFiles) * 100);
      }

      // Add new images to existing ones
      const allImages = [...currentImages, ...newImageUrls];
      console.log('Calling onImagesChanged with:', allImages);
      onImagesChanged(allImages);

    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onImagesChanged(newImages);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [currentImages]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <Label className="text-white/90 font-medium">Product Images ({currentImages.length}/{maxImages})</Label>
      
      {/* Current Images Display */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {currentImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img 
                src={imageUrl} 
                alt={`Product image ${index + 1}`} 
                className="w-full h-24 object-cover rounded-lg border border-white/20 group-hover:border-yellow-500/50 transition-all duration-200"
              />
              <Button
                type="button"
                onClick={() => removeImage(index)}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="w-3 h-3" />
              </Button>
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index === 0 ? 'Main' : index}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Section */}
      {currentImages.length < maxImages && (
        <div 
          className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-yellow-500/50 transition-colors duration-200"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            disabled={uploading}
            className="hidden"
            id="multi-image-upload"
          />
          
          <label htmlFor="multi-image-upload" className="cursor-pointer">
            <div className="space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto text-white/40" />
              <div>
                <p className="text-white/70 font-medium">
                  {uploading ? 'Uploading...' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-white/50 text-sm">
                  JPG, PNG, WebP up to 5MB each
                </p>
              </div>
            </div>
          </label>
          
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-white/70 text-sm">Uploading... {Math.round(uploadProgress)}%</p>
            </div>
          )}
        </div>
      )}

      {/* Manual URL Input */}
      {currentImages.length < maxImages && (
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">Or add image URLs manually:</Label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="flex-1 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value && !currentImages.includes(input.value)) {
                    onImagesChanged([...currentImages, input.value]);
                    input.value = '';
                  }
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                if (input.value && !currentImages.includes(input.value)) {
                  onImagesChanged([...currentImages, input.value]);
                  input.value = '';
                }
              }}
              size="sm"
              className="px-4 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/30"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
