using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class FollowCharacter : MonoBehaviour
{
    public Transform target;
    private float xMax, xMin, yMax, yMin;
    [SerializeField]
    private Tilemap tilemap;
    private Vector3 minTile, maxTile;

    // Start is called before the first frame update
    void Start()
    {
        minTile = tilemap.CellToWorld(tilemap.cellBounds.min);
        maxTile = tilemap.CellToWorld(tilemap.cellBounds.max);

        Limits(minTile, maxTile);  
    }

    // Update is called once per frame
    void LateUpdate()
    {
        transform.position = new Vector3(
            Mathf.Clamp(target.position.x, xMin, xMax), 
            Mathf.Clamp(target.position.y, yMin, yMax), 
            -10
        );
    }

    void Limits(Vector3 minTile, Vector3 maxTile)
    {
        Camera camera = Camera.main;

        float height = 2f * camera.orthographicSize;
        float width = height * camera.aspect;

        xMin = minTile.x + width / 2;
        xMax = maxTile.x - width / 2;

        yMin = minTile.y + height / 2;
        yMax = maxTile.y - height / 2;
    }
}
