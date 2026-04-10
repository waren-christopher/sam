Add-Type -AssemblyName System.Drawing
$p1 = 'c:\Users\Christopher\Documents\sam annan\assets\img4.jpeg'
$p2 = 'c:\Users\Christopher\Documents\sam annan\assets\img7.jpeg'

foreach ($p in @($p1, $p2)) {
    $img = [System.Drawing.Image]::FromFile($p)
    $w = $img.Width
    $h = $img.Height
    $newW = [int]($w * 0.85)
    $newH = [int]($h * 0.85)
    $y = [int]($h * 0.15)
    
    $rect = New-Object System.Drawing.Rectangle(0, $y, $newW, $newH)
    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $bmp.SetResolution($img.HorizontalResolution, $img.VerticalResolution)
    
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $gfx.Dispose()
    $img.Dispose()
    
    $bmp.Save($p, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
}
