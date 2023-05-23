class ResembleClient
  PROJECT_UUID = '1f995227'
  VOICE_UUID = '4c6d3da5' # "Charles" voice

  def self.create_clip(text)
    response = Resemble::V2::Clip.create_sync(
      PROJECT_UUID,
      VOICE_UUID,
      text,
      title: nil,
      sample_rate: nil,
      output_format: nil,
      precision: nil,
      include_timestamps: nil,
      is_public: nil,
      is_archived: nil,
      raw: nil
    )

    response['item']['audio_src']
  end
end
