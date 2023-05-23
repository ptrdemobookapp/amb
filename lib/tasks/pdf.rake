namespace :pdf do
  task :import, [:path] => :environment do |t, args|
    PDFImporter.new(args[:path]).import
  end
end
