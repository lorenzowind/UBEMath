using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ControlBar : MonoBehaviour
{
    private Image imgBar;

    // Start is called before the first frame update
    void Start()
    {
        imgBar = GetComponent<Image>();
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.Space)) 
        {
            imgBar.fillAmount -= 0.1f * Time.deltaTime;
        } 
        else if (imgBar.fillAmount < 1) 
        {
            imgBar.fillAmount += 0.3f * Time.deltaTime;
        }
        
    }
}
