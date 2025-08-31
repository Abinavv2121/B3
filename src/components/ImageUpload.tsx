import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Upload, X, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

export const ImageUpload = ({ onImageUploaded, currentImageUrl }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP)');
      return;
    }

    // Check if Supabase storage is available
    if (!supabase.storage) {
      alert('Storage is not available. Please check your Supabase configuration.');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      if (import.meta.env.DEV) console.log('Starting upload:', { fileName, filePath, fileSize: file.size });

      // First, let's test if we can access the storage bucket
      if (import.meta.env.DEV) console.log('Testing storage bucket access...');
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      if (import.meta.env.DEV) console.log('Available buckets:', buckets, 'Bucket error:', bucketError);

      if (bucketError) {
        throw new Error(`Storage bucket access failed: ${bucketError.message}`);
      }

      // Check if our bucket exists
      const bucketExists = buckets?.some(bucket => bucket.name === 'product-images');
      if (!bucketExists) {
        if (import.meta.env.DEV) console.error('Available buckets:', buckets?.map(b => b.name));
        throw new Error(`Storage bucket "product-images" not found. Available buckets: ${buckets?.map(b => b.name).join(', ') || 'None'}. Please create the bucket in Supabase Storage.`);
      }

      // Upload to Supabase Storage
      if (import.meta.env.DEV) console.log('Uploading file to storage...');
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        if (import.meta.env.DEV) console.error('Supabase upload error:', error);
        throw new Error(`Storage upload failed: ${error.message}`);
      }

      if (import.meta.env.DEV) console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      if (import.meta.env.DEV) console.log('Public URL generated:', publicUrl);

      onImageUploaded(publicUrl);
      setUploadProgress(100);

    } catch (error: any) {
      if (import.meta.env.DEV) console.error('Upload error details:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.error_description) {
        errorMessage = error.error_description;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      // Check for specific error types
      if (errorMessage.includes('bucket') || errorMessage.includes('not found')) {
        errorMessage = 'Storage bucket not found. Please check your Supabase configuration.';
      } else if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
        errorMessage = 'Permission denied. Please check your storage policies.';
      } else if (errorMessage.includes('size') || errorMessage.includes('too large')) {
        errorMessage = 'File is too large. Please use a smaller image.';
      } else if (errorMessage.includes('row-level security')) {
        errorMessage = 'Database security policy issue. Please check RLS settings.';
      }

      alert(`Upload Error: ${errorMessage}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = () => {
    onImageUploaded('');
  };

  return (
    <div className="space-y-4">
      <Label className="text-white/90 font-medium">Product Image</Label>
      
      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative">
          <img 
            src={currentImageUrl} 
            alt="Current product" 
            className="w-32 h-32 object-cover rounded-lg border border-white/20"
          />
          <Button
            type="button"
            onClick={removeImage}
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Upload Section */}
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="border-white/20 bg-white/5 text-white file:text-white file:bg-yellow-500/20 file:border-0 file:rounded file:px-3 file:py-1 file:mr-4 file:cursor-pointer hover:file:bg-yellow-500/30"
        />
        
        {/* Test Storage Connection */}
        <Button
          type="button"
          onClick={async () => {
            try {
              if (import.meta.env.DEV) console.log('Testing storage connection...');
              if (import.meta.env.DEV) console.log('Supabase client:', supabase);
              if (import.meta.env.DEV) console.log('Storage available:', !!supabase.storage);
              
              if (supabase.storage) {
                const { data, error } = await supabase.storage.listBuckets();
                if (import.meta.env.DEV) console.log('Buckets:', data, error);
                
                if (error) {
                  alert(`Storage test failed: ${error.message}`);
                } else {
                  alert(`Storage test successful! Found ${data?.length || 0} buckets. Available buckets: ${data?.map(b => b.name).join(', ') || 'None'}`);
                }
              } else {
                alert('Storage is not available in this Supabase client.');
              }
            } catch (err) {
              if (import.meta.env.DEV) console.error('Storage test error:', err);
              alert(`Storage test error: ${err}`);
            }
          }}
          size="sm"
          variant="outline"
          className="text-xs text-white/70 border-white/20 hover:bg-white/10"
        >
          Test Storage Connection
        </Button>
        
        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-white/70 text-sm">Uploading... {uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Manual URL Input */}
      <div className="space-y-2">
        <Label className="text-white/70 text-sm">Or enter image URL manually:</Label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={currentImageUrl || ""}
          onChange={(e) => onImageUploaded(e.target.value)}
          className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
        />
      </div>

      <p className="text-white/50 text-xs">
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </p>
    </div>
  );
};