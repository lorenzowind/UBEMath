using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public enum PlayerType
{
    Character = 0,
    MathMaster = 1
}
public class PlayerClass : CharacterBase
{
    public PlayerType playerType;

    // Start is called before the first frame update
    void Start()
    {
        playerType = PlayerType.Character;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
