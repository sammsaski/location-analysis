# Location Analysis
This application will provide real-time details about a location after being capture in the camera.

# Testing + Development
For testing:
1. `cd` into project directory
2. `expo start`
3. connect to application using expo via scanning the QR code 
4. start developing and save constantly to make sure nothing breaks!

For development:
1. make changes
2. `git add <files>`
3. `git commit`
4. `git push -u origin master` (still need to change from master -> main)


# React Native
When working with custom components, we can pass in props like so:
```javascript
export default class ClassName extends Component {
    render() {
        return(
            <div>Hello, {this.props.who}!</div>
        )
    }
}
```

Now, when we create the custom component with:
```javascript
<ClassName who="Earth"></ClassName>
```
the text in the `<div></div>` will be: `Hello, Earth!`


# CSS Heirarchy

For `CameraPage.js` -->
```
container -> ? (
    camera
    flipButtonContainer ->
        flipButton
        text
    cameraCaptureButtonContainer ->
        cameraCaptureButton
) : (
    container ->
        photo
        cancelButtonContainer ->
            text
)
```

How we want it to look
```
container -> ? (
    camera
    flipButtonContainer ->
        flipButton
        text
    cameraCaptureButtonContainer ->
        cameraCaptureButton
) : (
    photoContainer ->
        photo
        cancelButton ->
            text
)

```