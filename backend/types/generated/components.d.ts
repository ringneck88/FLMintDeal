import type { Schema, Struct } from '@strapi/strapi';

export interface CommerceTaxProfile extends Struct.ComponentSchema {
  collectionName: 'components_commerce_tax_profiles';
  info: {
    description: 'Tax calculation configuration';
    displayName: 'Tax Profile';
  };
  attributes: {
    excise_tax_rate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      >;
    local_tax_rate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      >;
    medical_tax_exempt: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sales_tax_rate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      >;
    tax_display_mode: Schema.Attribute.Enumeration<
      ['inclusive', 'exclusive', 'both']
    > &
      Schema.Attribute.DefaultTo<'exclusive'>;
    tax_inclusive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface CommonAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_addresses';
  info: {
    description: 'Physical address component';
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'US'>;
    formatted_address: Schema.Attribute.Text;
    postal_code: Schema.Attribute.String & Schema.Attribute.Required;
    state: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 2;
      }>;
    street_1: Schema.Attribute.String & Schema.Attribute.Required;
    street_2: Schema.Attribute.String;
  };
}

export interface CommonGeoPoint extends Struct.ComponentSchema {
  collectionName: 'components_common_geo_points';
  info: {
    description: 'Geographic coordinates';
    displayName: 'Geo Point';
  };
  attributes: {
    accuracy: Schema.Attribute.Decimal;
    latitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface CommonHours extends Struct.ComponentSchema {
  collectionName: 'components_common_hours';
  info: {
    description: 'Weekly operating hours';
    displayName: 'Operating Hours';
  };
  attributes: {
    friday_close: Schema.Attribute.Time;
    friday_closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    friday_open: Schema.Attribute.Time;
    monday_close: Schema.Attribute.Time;
    monday_closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    monday_open: Schema.Attribute.Time;
    notes: Schema.Attribute.Text;
    saturday_close: Schema.Attribute.Time;
    saturday_closed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    saturday_open: Schema.Attribute.Time;
    sunday_close: Schema.Attribute.Time;
    sunday_closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sunday_open: Schema.Attribute.Time;
    thursday_close: Schema.Attribute.Time;
    thursday_closed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    thursday_open: Schema.Attribute.Time;
    timezone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'America/New_York'>;
    tuesday_close: Schema.Attribute.Time;
    tuesday_closed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    tuesday_open: Schema.Attribute.Time;
    wednesday_close: Schema.Attribute.Time;
    wednesday_closed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    wednesday_open: Schema.Attribute.Time;
  };
}

export interface CommonHoursException extends Struct.ComponentSchema {
  collectionName: 'components_common_hours_exceptions';
  info: {
    description: 'Special hours for holidays and events';
    displayName: 'Hours Exception';
  };
  attributes: {
    close_time: Schema.Attribute.Time;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    is_closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.Text;
    open_time: Schema.Attribute.Time;
  };
}

export interface LegalDisclaimer extends Struct.ComponentSchema {
  collectionName: 'components_legal_disclaimers';
  info: {
    description: 'Legal disclaimer content';
    displayName: 'Legal Disclaimer';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    display_type: Schema.Attribute.Enumeration<['banner', 'modal', 'page']> &
      Schema.Attribute.DefaultTo<'banner'>;
    is_required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LegalTerms extends Struct.ComponentSchema {
  collectionName: 'components_legal_terms';
  info: {
    description: 'Terms and conditions component';
    displayName: 'Legal Terms';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    effective_date: Schema.Attribute.Date;
    summary: Schema.Attribute.Text;
    version: Schema.Attribute.String;
  };
}

export interface OpsFulfillmentRules extends Struct.ComponentSchema {
  collectionName: 'components_ops_fulfillment_rules';
  info: {
    description: 'Delivery and pickup rules';
    displayName: 'Fulfillment Rules';
  };
  attributes: {
    curbside_enabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    delivery_enabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    delivery_fee: Schema.Attribute.Decimal;
    delivery_radius: Schema.Attribute.Decimal;
    free_delivery_threshold: Schema.Attribute.Decimal;
    lead_time_minutes: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    max_daily_orders: Schema.Attribute.Integer;
    min_order_amount: Schema.Attribute.Decimal;
    pickup_enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface OpsRedirect extends Struct.ComponentSchema {
  collectionName: 'components_ops_redirects';
  info: {
    description: 'URL redirect configuration';
    displayName: 'Redirect';
  };
  attributes: {
    description: Schema.Attribute.String;
    from_path: Schema.Attribute.String & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    is_regex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    status_code: Schema.Attribute.Enumeration<
      ['permanent_301', 'temporary_302', 'temporary_307', 'permanent_308']
    > &
      Schema.Attribute.DefaultTo<'permanent_301'>;
    to_path: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OpsTrackingIds extends Struct.ComponentSchema {
  collectionName: 'components_ops_tracking_ids';
  info: {
    description: 'Analytics and tracking configuration';
    displayName: 'Tracking IDs';
  };
  attributes: {
    conversion_tracking: Schema.Attribute.JSON;
    custom_scripts: Schema.Attribute.Text;
    facebook_pixel: Schema.Attribute.String;
    google_analytics: Schema.Attribute.String;
    google_tag_manager: Schema.Attribute.String;
    hotjar_id: Schema.Attribute.String;
    linkedin_insight: Schema.Attribute.String;
  };
}

export interface PageBlocks extends Struct.ComponentSchema {
  collectionName: 'components_page_blocks';
  info: {
    description: 'Dynamic page layout blocks';
    displayName: 'Page Blocks';
  };
  attributes: {
    block_type: Schema.Attribute.Enumeration<
      ['hero', 'text', 'image', 'gallery', 'cta', 'form', 'map', 'video']
    > &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    media: Schema.Attribute.Media<'images' | 'videos', true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    settings: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    description: 'SEO metadata fields';
    displayName: 'SEO Meta';
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Schema.Attribute.String;
    og_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    og_image: Schema.Attribute.Media<'images'>;
    og_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    robots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index,follow'>;
    structured_data: Schema.Attribute.JSON;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    twitter_card: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image', 'app', 'player']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
  };
}

export interface StoreAmenityTag extends Struct.ComponentSchema {
  collectionName: 'components_store_amenity_tags';
  info: {
    description: 'Store amenities like parking, wheelchair access';
    displayName: 'Amenity Tag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface StoreServiceTag extends Struct.ComponentSchema {
  collectionName: 'components_store_service_tags';
  info: {
    description: 'Store services like curbside, delivery, medical';
    displayName: 'Service Tag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCta extends Struct.ComponentSchema {
  collectionName: 'components_ui_ctas';
  info: {
    description: 'Call-to-action component';
    displayName: 'CTA Block';
  };
  attributes: {
    background_color: Schema.Attribute.String;
    button_style: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
    button_text: Schema.Attribute.String & Schema.Attribute.Required;
    button_url: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text_color: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiLinkList extends Struct.ComponentSchema {
  collectionName: 'components_ui_link_lists';
  info: {
    description: 'List of links for support, footer, etc.';
    displayName: 'Link List';
  };
  attributes: {
    links: Schema.Attribute.Component<'ui.nav-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiNav extends Struct.ComponentSchema {
  collectionName: 'components_ui_navs';
  info: {
    description: 'Navigation component for header and footer';
    displayName: 'Navigation';
  };
  attributes: {
    items: Schema.Attribute.Component<'ui.nav-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiNavItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_nav_items';
  info: {
    description: 'Individual navigation item';
    displayName: 'Navigation Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiStoreFinderSettings extends Struct.ComponentSchema {
  collectionName: 'components_ui_store_finder_settings';
  info: {
    description: 'Configuration for store finder functionality';
    displayName: 'Store Finder Settings';
  };
  attributes: {
    default_location: Schema.Attribute.Component<'common.geo-point', false>;
    default_zoom: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<10>;
    filters: Schema.Attribute.JSON;
    google_maps_api_key: Schema.Attribute.String;
    max_distance: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    no_results_message: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'No stores found in your area'>;
    search_placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your address or ZIP code'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'commerce.tax-profile': CommerceTaxProfile;
      'common.address': CommonAddress;
      'common.geo-point': CommonGeoPoint;
      'common.hours': CommonHours;
      'common.hours-exception': CommonHoursException;
      'legal.disclaimer': LegalDisclaimer;
      'legal.terms': LegalTerms;
      'ops.fulfillment-rules': OpsFulfillmentRules;
      'ops.redirect': OpsRedirect;
      'ops.tracking-ids': OpsTrackingIds;
      'page.blocks': PageBlocks;
      'seo.meta': SeoMeta;
      'store.amenity-tag': StoreAmenityTag;
      'store.service-tag': StoreServiceTag;
      'ui.cta': UiCta;
      'ui.link-list': UiLinkList;
      'ui.nav': UiNav;
      'ui.nav-item': UiNavItem;
      'ui.store-finder-settings': UiStoreFinderSettings;
    }
  }
}
