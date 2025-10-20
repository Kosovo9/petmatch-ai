export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          country: string | null
          locale: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          country?: string | null
          locale?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          country?: string | null
          locale?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          species: string
          breed: string | null
          age: number | null
          weight: number | null
          gender: string | null
          photo_url: string | null
          medical_conditions: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species: string
          breed?: string | null
          age?: number | null
          weight?: number | null
          gender?: string | null
          photo_url?: string | null
          medical_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species?: string
          breed?: string | null
          age?: number | null
          weight?: number | null
          gender?: string | null
          photo_url?: string | null
          medical_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      love_stories: {
        Row: {
          id: string
          user_id: string
          pet_id: string
          title: string
          story: string
          photos: string[]
          verified: boolean
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_id: string
          title: string
          story: string
          photos?: string[]
          verified?: boolean
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_id?: string
          title?: string
          story?: string
          photos?: string[]
          verified?: boolean
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      service_providers: {
        Row: {
          id: string
          user_id: string
          service_type: string
          business_name: string
          description: string
          city: string
          country: string
          address: string | null
          phone: string
          email: string
          verified: boolean
          rating: number
          total_reviews: number
          price_range: string | null
          photos: string[]
          availability: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_type: string
          business_name: string
          description: string
          city: string
          country: string
          address?: string | null
          phone: string
          email: string
          verified?: boolean
          rating?: number
          total_reviews?: number
          price_range?: string | null
          photos?: string[]
          availability?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_type?: string
          business_name?: string
          description?: string
          city?: string
          country?: string
          address?: string | null
          phone?: string
          email?: string
          verified?: boolean
          rating?: number
          total_reviews?: number
          price_range?: string | null
          photos?: string[]
          availability?: Json
          created_at?: string
          updated_at?: string
        }
      }
      geo_ads: {
        Row: {
          id: string
          brand_name: string
          country: string
          ad_type: string
          title: string
          description: string
          image_url: string
          link_url: string
          active: boolean
          impressions: number
          clicks: number
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          id?: string
          brand_name: string
          country: string
          ad_type: string
          title: string
          description: string
          image_url: string
          link_url: string
          active?: boolean
          impressions?: number
          clicks?: number
          start_date: string
          end_date: string
          created_at?: string
        }
        Update: {
          id?: string
          brand_name?: string
          country?: string
          ad_type?: string
          title?: string
          description?: string
          image_url?: string
          link_url?: string
          active?: boolean
          impressions?: number
          clicks?: number
          start_date?: string
          end_date?: string
          created_at?: string
        }
      }
      airline_policies: {
        Row: {
          id: string
          airline_code: string
          airline_name: string
          country: string
          cabin_allowed: boolean
          cargo_allowed: boolean
          max_weight_cabin: number | null
          max_weight_cargo: number | null
          carrier_dimensions: string | null
          fees: Json
          restrictions: string[]
          documentation_required: string[]
          updated_at: string
        }
        Insert: {
          id?: string
          airline_code: string
          airline_name: string
          country: string
          cabin_allowed?: boolean
          cargo_allowed?: boolean
          max_weight_cabin?: number | null
          max_weight_cargo?: number | null
          carrier_dimensions?: string | null
          fees?: Json
          restrictions?: string[]
          documentation_required?: string[]
          updated_at?: string
        }
        Update: {
          id?: string
          airline_code?: string
          airline_name?: string
          country?: string
          cabin_allowed?: boolean
          cargo_allowed?: boolean
          max_weight_cabin?: number | null
          max_weight_cargo?: number | null
          carrier_dimensions?: string | null
          fees?: Json
          restrictions?: string[]
          documentation_required?: string[]
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          title: string
          description: string
          species: string
          ingredients: Json
          instructions: string[]
          nutrition_info: Json
          allergens: string[]
          difficulty: string
          prep_time: number
          photo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          species: string
          ingredients: Json
          instructions: string[]
          nutrition_info: Json
          allergens?: string[]
          difficulty: string
          prep_time: number
          photo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          species?: string
          ingredients?: Json
          instructions?: string[]
          nutrition_info?: Json
          allergens?: string[]
          difficulty?: string
          prep_time?: number
          photo_url?: string | null
          created_at?: string
        }
      }
      microinfluencers: {
        Row: {
          id: string
          user_id: string
          instagram_handle: string
          followers_count: number
          engagement_rate: number
          niche: string[]
          verified: boolean
          commission_rate: number
          total_earnings: number
          referral_code: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          instagram_handle: string
          followers_count: number
          engagement_rate: number
          niche?: string[]
          verified?: boolean
          commission_rate?: number
          total_earnings?: number
          referral_code: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          instagram_handle?: string
          followers_count?: number
          engagement_rate?: number
          niche?: string[]
          verified?: boolean
          commission_rate?: number
          total_earnings?: number
          referral_code?: string
          created_at?: string
        }
      }
      smart_collars: {
        Row: {
          id: string
          pet_id: string
          device_id: string
          battery_level: number
          last_location: Json
          activity_data: Json
          health_metrics: Json
          subscription_tier: string
          subscription_expires: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          device_id: string
          battery_level?: number
          last_location?: Json
          activity_data?: Json
          health_metrics?: Json
          subscription_tier: string
          subscription_expires: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          device_id?: string
          battery_level?: number
          last_location?: Json
          activity_data?: Json
          health_metrics?: Json
          subscription_tier?: string
          subscription_expires?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor: string
          duration_hours: number
          level: string
          price: number
          currency: string
          language: string
          topics: string[]
          certificate: boolean
          enrolled_count: number
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor: string
          duration_hours: number
          level: string
          price: number
          currency: string
          language: string
          topics?: string[]
          certificate?: boolean
          enrolled_count?: number
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor?: string
          duration_hours?: number
          level?: string
          price?: number
          currency?: string
          language?: string
          topics?: string[]
          certificate?: boolean
          enrolled_count?: number
          rating?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
