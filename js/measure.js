//GLOBALS
let measuringTool = new Potree.MeasuringTool(viewer);

//MEASUREMENT FUNCTIONS
function measPoint(){
    let measurement = measuringTool.startInsertion({
        showDistances: false,
        showAngles: false,
        showCoordinates: true,
        showArea: false,
        closed: true,
        maxMarkers: 1,
        name: 'Point'});
}

function measDistance(){
    let measurement = measuringTool.startInsertion({
        showDistances: true,
        showArea: false,
        closed: false,
        name: 'Distance'});
}

function measHeight(){
    let measurement = measuringTool.startInsertion({
        showDistances: false,
        showHeight: true,
        showArea: false,
        closed: false,
        maxMarkers: 2,
        name: 'Height'});
}

function measAngle(){
    let measurement = measuringTool.startInsertion({
        showDistances: false,
        showAngles: true,
        showArea: true,
        closed: true,
        name: 'Angle'});
}

function measClear(){
    viewer.scene.removeAllMeasurements();
    lookAtPtNum = null;
    dofilterimages = false;
    $('#filterbtn').removeClass('buttonfgclicked');
    $('#lookatbtn').removeClass('buttonfgclicked');

    turnImagesOn();
    if (cameraplaneview){
        turnImagesOff();
    }
}

function projected2WGS84(x,y){
    let pointcloudProjection = "+proj=utm +zone=20 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";
    let mapProjection = proj4.defs("WGS84");

    var lonlat = proj4(pointcloudProjection,mapProjection,[x,y]);

    return [lonlat[1], lonlat[0]]
}

function projectedFromWGS84(lat,lng){
    let pointcloudProjection = "+proj=utm +zone=20 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";
    let mapProjection = proj4.defs("WGS84");

    var xy = proj4(mapProjection,pointcloudProjection,[lng,lat]);

    return [xy[0], xy[1]]
}
